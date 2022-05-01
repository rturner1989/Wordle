import { useState } from "react";
import "./App.css";
import { singleWord } from "./Library/Interface";
import GameSelection from "./Components/GameSelection";

function App() {
    const [wordData, setWordData] = useState<singleWord[] | null>(null);

    return (
        <div className="App">
            {!wordData ? (
                <GameSelection modeSelect={setWordData} />
            ) : (
                <div>
                    {wordData.map((item, index) => {
                        const { word } = item;
                        return <p key={index}>{word}</p>;
                    })}
                </div>
            )}
        </div>
    );
}

export default App;
