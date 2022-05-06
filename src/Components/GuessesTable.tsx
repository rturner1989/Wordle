import React from "react";
import EmptyRow from "./EmptyRow";
import Row from "./Row";

interface props {
    gameLength: number;
    history: string[][];
    inputWord: string[];
}

const GuessesTable: React.FC<props> = ({ gameLength, history, inputWord }) => {
    return (
        <div>
            {history.map((prevWord, index) => {
                return (
                    <React.Fragment key={index}>
                        {prevWord === undefined ? (
                            <EmptyRow gameLength={gameLength} />
                        ) : (
                            <Row gameLength={gameLength} prevWord={prevWord} />
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
};

export default GuessesTable;
