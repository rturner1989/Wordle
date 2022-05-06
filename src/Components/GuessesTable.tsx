import React from "react";
import EmptyRow from "./EmptyRow";
import Row from "./Row";

interface props {
    history: string[][];
    inputWord: string[];
}

const GuessesTable: React.FC<props> = ({ history, inputWord }) => {
    console.log(history);

    return (
        <div>
            {history.map((prevWord, index) => {
                return (
                    <React.Fragment key={index}>
                        {prevWord === undefined ? (
                            <EmptyRow />
                        ) : (
                            <Row prevWord={prevWord} />
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
};

export default GuessesTable;
