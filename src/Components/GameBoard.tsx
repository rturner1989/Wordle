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
        console.log("fired");
    };

    return (
        <div>
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
