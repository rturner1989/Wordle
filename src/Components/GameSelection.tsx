import React, { SetStateAction } from "react";
import axios from "axios";
import { difficulty } from "../Library/Interface";
import { gameDifficulty } from "../Library/enums";

interface props {
    modeSelect: React.Dispatch<SetStateAction<string[] | null>>;
}

const GameSelection: React.FC<props> = ({ modeSelect }) => {
    const getWordData = (mode: gameDifficulty) => {
        const url = "wordData.json";
        axios
            .get<difficulty[]>(url)
            .then((res) => {
                const initialData = res.data;

                let data: string[] = [];

                initialData.forEach((obj: difficulty) => {
                    if (obj.mode.includes(mode)) {
                        obj.words.forEach((word) => data.push(word));
                    }
                });

                modeSelect(data);
            })
            .catch((err) => console.error(`Error: ${err}`));
    };

    return (
        <div>
            <button onClick={() => getWordData(gameDifficulty.EASY)}>{gameDifficulty.EASY}</button>
            <button onClick={() => getWordData(gameDifficulty.NORMAL)}>{gameDifficulty.NORMAL}</button>
            <button onClick={() => getWordData(gameDifficulty.HARD)}>{gameDifficulty.HARD}</button>
        </div>
    );
};

export default GameSelection;
