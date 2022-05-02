import React from "react";

interface props {
    guessWord: string | null;
}

const GameBoard: React.FC<props> = ({ guessWord }) => {
    return <div>{guessWord}</div>;
};

export default GameBoard;
