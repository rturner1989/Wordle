import { SetStateAction, useEffect, Fragment } from "react";
import { keyType } from "../Library/Interface";
import { BsBackspace } from "react-icons/bs";
import { keyState } from "../Library/enums";

interface props {
    keys: keyType[];
    answerLength: number;
    input: keyType[];
    setInput: React.Dispatch<SetStateAction<keyType[]>>;
    enter: () => void;
    gameState: boolean;
}

const Keyboard: React.FC<props> = ({ keys, answerLength, input, setInput, enter, gameState }) => {
    const addLetterToInput = (key: string) => {
        if (input.length >= answerLength) return;
        if (key === "Enter") return;

        setInput((prev) => {
            return [...prev, { keyTrigger: key, state: keyState.DEFAULT }];
        });
    };

    const deleteLastLetter = () => {
        setInput(input.slice(0, input.length - 1));
    };

    const handleInput = (key: string) => {
        if (!gameState) {
            if (key.match(/[a-z]/i)) {
                addLetterToInput(key.toLowerCase());
            }
            if (key === "Backspace") {
                deleteLastLetter();
            }
            if (key === "Enter") {
                enter();
            }
        }
        return;
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => handleInput(e.key);
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [input]);

    return (
        <div className="keyboard">
            {keys.map((key, index) => {
                const { keyTrigger, state } = key;
                return (
                    <Fragment key={index}>
                        <button className={`btn keyboard-btn-${state}`} onClick={() => handleInput(keyTrigger)}>
                            {keyTrigger.toUpperCase()}
                        </button>

                        {(keyTrigger.toLowerCase() === "p" || keyTrigger.toLowerCase() === "l") && (
                            <div className="emptyDiv"></div>
                        )}

                        {keyTrigger.toLowerCase() === "l" && (
                            <button className="enterBtn" onClick={() => handleInput("Enter")}>
                                Enter
                            </button>
                        )}

                        {keyTrigger.toLowerCase() === "m" && (
                            <button className="deleteBtn" onClick={() => handleInput("Backspace")}>
                                <BsBackspace />
                            </button>
                        )}
                    </Fragment>
                );
            })}
        </div>
    );
};

export default Keyboard;
