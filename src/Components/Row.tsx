import React from "react";
import { keyType } from "../Library/Interface";

interface props {
    prevWord: keyType[] | undefined;
    gameLength: number;
}

const Row: React.FC<props> = ({ prevWord, gameLength }) => {
    return (
        <div
            className="row"
            style={{ gridTemplateColumns: `repeat(${gameLength}, 1fr)`, maxWidth: `calc(67.5px * ${gameLength})` }}
        >
            {prevWord?.map((letter, index) => {
                return (
                    <div key={`${letter}${index}`} className={`rowLetter btn-${letter?.state}`}>
                        {letter?.keyTrigger}
                    </div>
                );
            })}
        </div>
    );
};

export default Row;
