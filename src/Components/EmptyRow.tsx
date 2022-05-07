import React from "react";

interface props {
    gameLength: number;
}

const EmptyRow: React.FC<props> = ({ gameLength }) => {
    return (
        <div className="row">
            {[...Array(gameLength)].map((i, index) => (
                <div key={index} className="rowLetter" />
            ))}
        </div>
    );
};

export default EmptyRow;
