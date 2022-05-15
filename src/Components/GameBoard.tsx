import { useState } from "react";
import { keyState } from "../Library/enums";
import { keyType } from "../Library/Interface";
import GuessesTable from "./GuessesTable";
import Keyboard from "./Keyboard";

interface props {
    gameData: string[] | null;
    guessWord: string;
    exitGame: () => void;
}

const GameBoard: React.FC<props> = ({ gameData, guessWord, exitGame }) => {
    const alphabet = "qwertyuiopasdfghjklzxcvbnm";
    const answerSplit = guessWord.split("");

    const [currentWordInput, setCurrentWordInput] = useState<keyType[]>([]);
    const [guessHistory, setGuessHistory] = useState<keyType[][]>([...Array(6)]);
    const [keys, setKeys] = useState<keyType[]>(() =>
        alphabet.split("").map((letter: string) => {
            return {
                keyTrigger: letter,
                state: keyState.DEFAULT,
            };
        })
    );
    const [gameState, setGameState] = useState<boolean>(false);
    const [turn, setTurn] = useState(1);

    const updateKeyState = (char: string, color: keyState) => {
        keys.forEach((key, index) => {
            if (key.keyTrigger !== char) {
                return;
            }
            if (key.state === keyState.CORRECT) return;
            setKeys((prev) => {
                const newKey = { ...prev[index], state: color };
                return [...prev.slice(0, index), newKey, ...prev.slice(index + 1)];
            });
        });
    };

    const updateHistory = (array: keyType[]) => {
        guessHistory.forEach((key: keyType[]) => {
            if (key !== undefined) return;
            setGuessHistory((prev) => {
                return [...prev.slice(0, turn - 1), array, ...prev.slice(turn)];
            });
        });
    };

    const getJoinedHistory = () => {
        let result: string[] = [];
        guessHistory.forEach((guess: keyType[]) => {
            if (guess !== undefined)
                guess.forEach((key) => {
                    result.push(key.keyTrigger);
                });
        });
        return result.join("");
    };

    const compareWords = () => {
        let result: keyType[] = [];

        const joinedInput: string = currentWordInput.map((key: keyType) => key.keyTrigger).join("");

        // if word matches
        if (joinedInput === guessWord) {
            alert("You Win");
            setGameState(true);
        }

        // if word is too short
        if (currentWordInput.length < answerSplit.length) {
            alert("not enough letters");
            setCurrentWordInput([]);
            return;
        }

        // check if input has been entered before
        if (getJoinedHistory().includes(joinedInput)) {
            alert("word already used");
            setCurrentWordInput([]);
            return;
        }

        // check if word is a word (based on data file)
        if (gameData) {
            if (!gameData.map((word) => word).includes(joinedInput)) {
                alert("Not a word");
                setCurrentWordInput([]);
                return;
            }
        }

        currentWordInput.forEach((key, index) => {
            if (!answerSplit.includes(key.keyTrigger)) {
                result.push({
                    keyTrigger: key.keyTrigger,
                    state: keyState.INCORRECT,
                });
                updateKeyState(key.keyTrigger, keyState.INCORRECT);
            } else if (answerSplit[index] === key.keyTrigger) {
                result.push({
                    keyTrigger: key.keyTrigger,
                    state: keyState.CORRECT,
                });
                updateKeyState(key.keyTrigger, keyState.CORRECT);
            } else {
                result.push({
                    keyTrigger: key.keyTrigger,
                    state: keyState.WRONGLOCATION,
                });
                updateKeyState(key.keyTrigger, keyState.WRONGLOCATION);
            }
        });

        setTurn(turn + 1);
        updateHistory(result);
        setCurrentWordInput([]);
    };

    return (
        <div className="gameContainer">
            {guessWord}
            <button onClick={exitGame}>clear</button>
            <GuessesTable
                gameLength={answerSplit.length}
                history={guessHistory}
                inputWord={currentWordInput}
                turn={turn}
            />
            <Keyboard
                keys={keys}
                answerLength={answerSplit.length}
                input={currentWordInput}
                setInput={setCurrentWordInput}
                enter={compareWords}
                gameState={gameState}
            />
        </div>
    );
};

export default GameBoard;
