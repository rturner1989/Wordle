import React from "react";

interface props {
    gameLength: number;
}

const EmptyRow: React.FC<props> = ({ gameLength }) => {
    return (
        <div className="row">
            <div className="rowLetter"></div>
            <div className="rowLetter"></div>
            <div className="rowLetter"></div>
            <div className="rowLetter"></div>
            <div className="rowLetter"></div>
        </div>
    );
};

export default EmptyRow;
