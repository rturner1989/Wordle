import React from "react";
import EmptyRow from "./EmptyRow";
import Row from "./Row";

interface props {
    gameLength: number;
    history: string[][];
    inputWord: string[];
    turn: number;
}

const GuessesTable: React.FC<props> = ({
    gameLength,
    history,
    inputWord,
    turn,
}) => {
    return (
        <div>
            {history.map((prevWord, index) => {
                console.log(index);

                if (index === turn - 1) {
                    console.log("fierd");

                    return (
                        <React.Fragment key={index}>
                            <Row
                                gameLength={gameLength}
                                prevWord={[
                                    ...inputWord,
                                    ...Array(gameLength - inputWord.length),
                                ]}
                            />
                        </React.Fragment>
                    );
                }

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
