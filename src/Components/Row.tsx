import React from "react";
import { makeID } from "../Library/helpers";

interface props {
    prevWord: string[] | undefined;
    gameLength: number;
}

const Row: React.FC<props> = ({ prevWord }) => {
    console.log(prevWord);

    return (
        <div className="row">
            {prevWord?.map((letter) => {
                return (
                    <div key={makeID()} className="rowLetter">
                        {letter}
                    </div>
                );
            })}
        </div>
    );
};

export default Row;
