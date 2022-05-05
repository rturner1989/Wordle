import { useState } from "react";
import { updateIf } from "typescript";
import { keyState } from "../Library/enums";
import { keyType } from "../Library/Interface";
import GuessesTable from "./GuessesTable";
import Keyboard from "./Keyboard";

interface props {
    guessWord: string;
    exitGame: () => void;
}

const GameBoard: React.FC<props> = ({ guessWord, exitGame }) => {
    const [currentWordInput, setCurrentWordInput] = useState<string[]>([]);
    const [answerSplit, setAnswerSplit] = useState(guessWord.split(""));

    const alphabet = "qwertyuiopasdfghjklzxcvbnm";

    const [keys, setKeys] = useState<keyType[]>(() =>
        alphabet.split("").map((letter: string) => {
            return {
                keyTrigger: letter,
                state: keyState.DEFAULT,
            };
        })
    );

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

    const compareWords = () => {
        return currentWordInput.forEach((char, index) => {
            if (!answerSplit.includes(char)) {
                return updateKeyState(char, keyState.INCORRECT);
            }
            return answerSplit[index] === char
                ? updateKeyState(char, keyState.CORRECT)
                : updateKeyState(char, keyState.WRONGLOCATION);
        });
    };

    console.log(keys);

    return (
        <div>
            {guessWord}
            <button onClick={exitGame}>clear</button>
            <GuessesTable guessWord={guessWord} />
            <Keyboard
                keys={keys}
                answerLength={answerSplit.length}
                input={currentWordInput}
                setInput={setCurrentWordInput}
                enter={compareWords}
            />
        </div>
    );
};

export default GameBoard;
