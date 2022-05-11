import React from "react";
import { makeID } from "../Library/helpers";
import { keyType } from "../Library/Interface";

interface props {
    prevWord: keyType[] | undefined;
    gameLength: number;
}

const Row: React.FC<props> = ({ prevWord }) => {
    return (
        <div className="row">
            {prevWord?.map((letter) => {
                return (
                    <div key={makeID()} className={`rowLetter btn-${letter?.state}`}>
                        {letter?.keyTrigger}
                    </div>
                );
            })}
        </div>
    );
};

export default Row;
