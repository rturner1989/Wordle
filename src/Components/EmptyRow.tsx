import React from "react";

interface props {
    gameLength: number;
}

const EmptyRow: React.FC<props> = ({ gameLength }) => {
    return (
        <div
            className="row"
            style={{ gridTemplateColumns: `repeat(${gameLength}, 1fr)`, maxWidth: `calc(67.5px * ${gameLength})` }}
        >
            {[...Array(gameLength)].map((i, index) => (
                <div key={index} className="rowLetter" />
            ))}
        </div>
    );
};

export default EmptyRow;
