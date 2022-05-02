import React from "react";

interface props {
    guessWord: string | null;
}

const GuessesTable: React.FC<props> = ({ guessWord }) => {
    return <div>GuessesTable</div>;
};

export default GuessesTable;
