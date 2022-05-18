import { useState, useEffect } from "react";
import "./App.css";
import GameSelection from "./Components/GameSelection";
import GameBoard from "./Components/GameBoard";
import useLocalStorage from "./Hooks/useLocalStorage";

function App() {
    const [gameWord, setGameWord] = useState<string>("");
    const [data, setData] = useState<string[]>([]);
    const [score, setScore] = useLocalStorage("score", 0);

    const random: number = Math.floor(Math.random() * data.length);

    const clearWord = () => {
        setGameWord("");
        setData([]);
    };

    const newWord = () => {
        setGameWord(data[random]);
    };

    const resetScore = () => {
        setScore(0);
    };

    useEffect(() => {
        setGameWord(data[random]);
    }, [data]);

    return (
        <div className="App">
            <button className="reset" onClick={() => resetScore()}>
                Reset Score
            </button>
            {gameWord ? (
                <GameBoard
                    gameData={data}
                    guessWord={gameWord.toLowerCase()}
                    exitGame={clearWord}
                    newWord={newWord}
                    score={score}
                    setScore={setScore}
                />
            ) : (
                <GameSelection modeSelect={setData} />
            )}
        </div>
    );
}

export default App;
