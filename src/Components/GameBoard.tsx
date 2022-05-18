import { useState, useEffect, SetStateAction } from "react";
import { keyState, popupMessage } from "../Library/enums";
import { keyType } from "../Library/Interface";
import GuessesTable from "./GuessesTable";
import Keyboard from "./Keyboard";
import Popup from "./Popup";
import SplashScreen from "./SplashScreen";

interface props {
    gameData: string[];
    guessWord: string;
    exitGame: () => void;
    newWord: () => void;
    score: number;
    setScore: React.Dispatch<SetStateAction<number>>;
}

const GameBoard: React.FC<props> = ({ gameData, guessWord, exitGame, newWord, score, setScore }) => {
    const answerSplit = guessWord.split("");
    const alphabet = "qwertyuiopasdfghjklzxcvbnm";
    let defaultKeys = () =>
        alphabet.split("").map((letter: string) => {
            return {
                keyTrigger: letter,
                state: keyState.DEFAULT,
            };
        });
    const defaultHistory = [...Array(6)];

    const [currentWordInput, setCurrentWordInput] = useState<keyType[]>([]);
    const [guessHistory, setGuessHistory] = useState<keyType[][]>(defaultHistory);
    const [keys, setKeys] = useState<keyType[]>(defaultKeys());
    const [gameState, setGameState] = useState<boolean>(false);
    const [turn, setTurn] = useState<number>(1);
    const [message, setMessage] = useState<popupMessage | null>(null);

    const resetGame = () => {
        setGuessHistory(defaultHistory);
        setCurrentWordInput([]);
        setKeys(defaultKeys());
        setTurn(1);
        setGameState(false);
    };

    const playAgain = () => {
        resetGame();
        newWord();
    };

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
            if (key === undefined) {
                setGuessHistory((prev) => {
                    return [...prev.slice(0, turn - 1), array, ...prev.slice(turn)];
                });
            }
            return;
        });
    };

    const getJoinedHistory = () => {
        let result: string[] = [];
        guessHistory.forEach((guess: keyType[]) => {
            if (guess === undefined) return;
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
            setScore(score + 1);
            setGameState(true);
        }

        // if word is too short
        if (currentWordInput.length < answerSplit.length) {
            setMessage(popupMessage.NOTENOUGH);
            setCurrentWordInput([]);
            return;
        }

        // check if input has been entered before
        if (getJoinedHistory().includes(joinedInput)) {
            setMessage(popupMessage.USED);
            setCurrentWordInput([]);
            return;
        }

        // check if word is a word (based on data file)
        if (!gameData.map((word) => word.toLowerCase()).includes(joinedInput)) {
            setMessage(popupMessage.NOTWORD);
            setCurrentWordInput([]);
            return;
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

    useEffect(() => {
        let timer = setTimeout(() => {
            setMessage(null);
        }, 1500);

        return () => {
            clearTimeout(timer);
        };
    }, [message]);

    useEffect(() => {
        if (turn > 6) {
            setGameState(true);
        }
    }, [turn]);

    return (
        <div className="gameContainer">
            <div className="displayBar">
                <button className="exitBtn" onClick={exitGame}>
                    clear
                </button>
                <Popup popupMessage={message} />
                <div className="scoreContainer">
                    <h4>Score:</h4>
                    <p>{score}</p>
                </div>
            </div>
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
            {gameState && (
                <SplashScreen playAgain={playAgain} exit={exitGame} message={turn > 6 ? "Loser" : "Winner"} />
            )}
        </div>
    );
};

export default GameBoard;
