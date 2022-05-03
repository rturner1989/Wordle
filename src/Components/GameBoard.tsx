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

    const compareWords = () => {
        return currentWordInput.forEach((char, index) => {
            if (!answerSplit.includes(char)) {
                console.log("not included");
            }
            return answerSplit[index] === char
                ? console.log("correct location")
                : console.log("included but wrong location");
        });
    };

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
