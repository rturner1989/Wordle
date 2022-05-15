import { useState, useEffect } from "react";
import "./App.css";
import GameSelection from "./Components/GameSelection";
import GameBoard from "./Components/GameBoard";

function App() {
    const [gameWord, setGameWord] = useState<string | null>(null);
    const [data, setData] = useState<string[] | null>([]);

    const random: number = data ? Math.floor(Math.random() * data.length) : 0;

    const clearWord = () => {
        setGameWord(null);
        setData(null);
    };

    const selectNewWord = () => {
        if (data) {
            setGameWord(data[random]);
        }
        return;
    };

    useEffect(() => {
        selectNewWord();
    }, [data]);

    return (
        <div className="App">
            {gameWord ? (
                <GameBoard gameData={data} guessWord={gameWord} exitGame={clearWord} />
            ) : (
                <GameSelection modeSelect={setData} />
            )}
        </div>
    );
}

export default App;
