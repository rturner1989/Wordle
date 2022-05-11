import React from "react";
import { keyState } from "../Library/enums";
import { keyType } from "../Library/Interface";
import EmptyRow from "./EmptyRow";
import Row from "./Row";

interface props {
    gameLength: number;
    history: keyType[][];
    inputWord: keyType[];
    turn: number;
}

const GuessesTable: React.FC<props> = ({ gameLength, history, inputWord, turn }) => {
    return (
        <div className="gamegrid">
            {history.map((prevWord, index) => {
                if (index === turn - 1) {
                    return (
                        <React.Fragment key={index}>
                            <Row
                                gameLength={gameLength}
                                prevWord={[...inputWord, ...Array(gameLength - inputWord.length)]}
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
