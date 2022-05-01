import { useState, useEffect } from "react";
import "./App.css";
import { singleWord } from "./Library/Interface";
import GameSelection from "./Components/GameSelection";

function App() {
    const [wordData, setWordData] = useState<singleWord[] | null>(null);
    const [gameWord, setGameWord] = useState<singleWord | null>(null);

    const gameWordSelection = () => {
        if (!wordData) return;
        const random = Math.floor(Math.random() * wordData.length);
        setGameWord(wordData[random]);
    };

    useEffect(() => {
        gameWordSelection();
    }, [wordData]);

    return (
        <div className="App">
            {!wordData ? (
                <GameSelection modeSelect={setWordData} />
            ) : (
                <div>{gameWord?.word}</div>
            )}
        </div>
    );
}

export default App;
