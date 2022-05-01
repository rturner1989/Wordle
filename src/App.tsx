import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { singleWord } from "./Library/Interface";

function App() {
    const [wordData, setWordData] = useState<singleWord[]>([]);

    const getAllWords = () => {
        axios
            .get<singleWord[]>("data.json")
            .then((res) => {
                const data = res.data;
                setWordData(data);
            })
            .catch((err) => console.error(`Error: ${err}`));
    };

    // on load get all 5 letter words
    useEffect(() => {
        getAllWords();
    }, []);

    return (
        <div className="App">
            {wordData &&
                wordData.map((item, index) => {
                    const { word } = item;
                    return <p key={index}>{word}</p>;
                })}
        </div>
    );
}

export default App;
