import { useState, useEffect } from "react";
import "./App.css";
import { singleWord } from "./Library/Interface";
import GameSelection from "./Components/GameSelection";
import GameBoard from "./Components/GameBoard";

function App() {
    const [wordData, setWordData] = useState<singleWord[] | null>(null);
    const [gameWord, setGameWord] = useState<singleWord | null>(null);

    // render component
    const screenSelection = () => {
        if (!wordData) {
            return <GameSelection modeSelect={setWordData} />;
        } else {
            if (!gameWord) return;
            return <GameBoard guessWord={gameWord.word} />;
        }
    };

    // set game word
    const gameWordSelection = () => {
        if (!wordData) return;
        const random = Math.floor(Math.random() * wordData.length);
        setGameWord(wordData[random]);
    };
    useEffect(() => {
        gameWordSelection();
    }, [wordData]);

    return <div className="App">{screenSelection()}</div>;
}

export default App;
