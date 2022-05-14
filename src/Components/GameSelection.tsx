import React, { SetStateAction } from "react";
import axios from "axios";
import { gameDifficulty, singleWord } from "../Library/Interface";

interface props {
    modeSelect: React.Dispatch<SetStateAction<singleWord[] | null>>;
}

const GameSelection: React.FC<props> = ({ modeSelect }) => {
    const gameDifficulty: gameDifficulty[] = [
        { diffName: "easy", diffMode: "easyModeData.json" },
        { diffName: "normal", diffMode: "normalModeData.json" },
        { diffName: "hard", diffMode: "hardModeData.json" },
    ];

    const getWordData = (url: string) => {
        axios
            .get<singleWord[]>(url)
            .then((res) => {
                const data = res.data;
                modeSelect(data);
            })
            .catch((err) => console.error(`Error: ${err}`));
    };

    return (
        <div>
            {gameDifficulty.map((diff) => {
                const { diffName, diffMode } = diff;
                return (
                    <button key={diffName} onClick={() => getWordData(diffMode)}>
                        {diffName}
                    </button>
                );
            })}
        </div>
    );
};

export default GameSelection;
