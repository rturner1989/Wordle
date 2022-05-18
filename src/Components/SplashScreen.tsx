import React from "react";

interface props {
    playAgain: () => void;
    exit: () => void;
    message: string;
}

const SplashScreen: React.FC<props> = ({ playAgain, exit, message }) => {
    return (
        <div className="winLose">
            <h3>{message}</h3>
            <button
                onClick={() => {
                    playAgain();
                }}
            >
                Play Again
            </button>
            <button onClick={() => exit()}>Exit</button>
        </div>
    );
};

export default SplashScreen;
