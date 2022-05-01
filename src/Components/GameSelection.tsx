import React, { SetStateAction } from "react";
import axios from "axios";
import { singleWord } from "../Library/Interface";

interface props {
    modeSelect: React.Dispatch<SetStateAction<singleWord[] | null>>;
}

const GameSelection: React.FC<props> = ({ modeSelect }) => {
    const easy: string = "easyModeData.json";
    const normal: string = "normalModeData.json";
    const hard: string = "hardModeData.json";

    const getAllWords = (url: string) => {
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
            <button onClick={() => getAllWords(easy)}>Easy</button>
            <button onClick={() => getAllWords(normal)}>Normal</button>
            <button onClick={() => getAllWords(hard)}>Hard</button>
        </div>
    );
};

export default GameSelection;
