import React, { SetStateAction } from "react";
import axios from "axios";
import { gameDifficulty, singleWord } from "../Library/Interface";

interface props {
    modeSelect: React.Dispatch<SetStateAction<singleWord | null>>;
}

const GameSelection: React.FC<props> = ({ modeSelect }) => {
    const gameDifficulty: gameDifficulty[] = [
        { diffName: "easy", diffMode: "easyModeData.json" },
        { diffName: "normal", diffMode: "normalModeData.json" },
        { diffName: "hard", diffMode: "hardModeData.json" },
    ];

    const getRandomWord = (url: string) => {
        axios
            .get<singleWord[]>(url)
            .then((res) => {
                const data = res.data;
                const random = Math.floor(Math.random() * data.length);
                modeSelect(data[random]);
            })
            .catch((err) => console.error(`Error: ${err}`));
    };

    return (
        <div>
            {gameDifficulty.map((diff) => {
                const { diffName, diffMode } = diff;
                return (
                    <button
                        key={diffName}
                        onClick={() => getRandomWord(diffMode)}
                    >
                        {diffName}
                    </button>
                );
            })}
        </div>
    );
};

export default GameSelection;
