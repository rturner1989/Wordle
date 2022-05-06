import React from "react";

interface props {
    prevWord: string[] | undefined;
}

const Row: React.FC<props> = ({ prevWord }) => {
    console.log(prevWord);

    return (
        <div className="row">
            {prevWord?.map((letter) => {
                return (
                    <div key={letter} className="rowLetter">
                        {letter}
                    </div>
                );
            })}
        </div>
    );
};

export default Row;
