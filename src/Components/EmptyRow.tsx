import React from "react";

interface props {}

const EmptyRow: React.FC<props> = () => {
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
