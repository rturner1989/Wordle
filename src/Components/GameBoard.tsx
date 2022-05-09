import { useState } from "react";
import { keyState } from "../Library/enums";
import { keyType } from "../Library/Interface";
import GuessesTable from "./GuessesTable";
import Keyboard from "./Keyboard";

interface props {
    guessWord: string;
    exitGame: () => void;
}

const GameBoard: React.FC<props> = ({ guessWord, exitGame }) => {
    const alphabet = "qwertyuiopasdfghjklzxcvbnm";

    const [currentWordInput, setCurrentWordInput] = useState<string[]>([]);
    const [answerSplit, setAnswerSplit] = useState(guessWord.split(""));
    const [keys, setKeys] = useState<keyType[]>(() =>
        alphabet.split("").map((letter: string) => {
            return {
                keyTrigger: letter,
                state: keyState.DEFAULT,
            };
        })
    );

    const [turn, setTurn] = useState(1);
    const [guessHistory, setGuessHistory] = useState<string[][]>([...Array(6)]);
    const [gameState, setGameState] = useState<boolean>(false);

    const updateKeyState = (char: string, color: keyState) => {
        return keys.forEach((key, index) => {
            if (key.keyTrigger !== char) {
                return;
            }
            setKeys((prev) => {
                const newKey = { ...prev[index], state: color };
                return [
                    ...prev.slice(0, index),
                    newKey,
                    ...prev.slice(index + 1),
                ];
            });
        });
    };

    const updateHistory = () => {
        return guessHistory.forEach((key) => {
            if (key !== undefined) return;

            setGuessHistory((prev) => {
                return [
                    ...prev.slice(0, turn - 1),
                    currentWordInput,
                    ...prev.slice(turn),
                ];
            });
        });
    };

    const compareWords = () => {
        if (currentWordInput.length < answerSplit.length) return;
        currentWordInput.forEach((char, index) => {
            if (!answerSplit.includes(char)) {
                return updateKeyState(char, keyState.INCORRECT);
            } else {
                if (answerSplit[index] === char) {
                    return updateKeyState(char, keyState.CORRECT);
                }
                return updateKeyState(char, keyState.WRONGLOCATION);
            }
        });
        if (currentWordInput.join("") === guessWord) setGameState(true);
        setTurn(turn + 1);
        updateHistory();
        setCurrentWordInput([]);
    };

    return (
        <div>
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
