import { useState, useEffect } from "react";
import "./App.css";
import GameSelection from "./Components/GameSelection";
import GameBoard from "./Components/GameBoard";

function App() {
    const [gameWord, setGameWord] = useState<string>("");
    const [data, setData] = useState<string[]>([]);

    const random: number = Math.floor(Math.random() * data.length);

    const clearWord = () => {
        setGameWord("");
        setData([]);
    };

    const newWord = () => {
        setGameWord(data[random]);
    };

    useEffect(() => {
        setGameWord(data[random]);
    }, [data]);

    return (
        <div className="App">
            {gameWord ? (
                <GameBoard gameData={data} guessWord={gameWord.toLowerCase()} exitGame={clearWord} newWord={newWord} />
            ) : (
                <GameSelection modeSelect={setData} />
            )}
        </div>
    );
}

export default App;
