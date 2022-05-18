import React from "react";
import { GrPowerReset } from "react-icons/gr";

interface props {
    playAgain: () => void;
    exit: () => void;
    message: string;
}

const SplashScreen: React.FC<props> = ({ playAgain, exit, message }) => {
    return (
        <div className="winLose">
            <button onClick={() => exit()}>Exit</button>
            <h3>{message}</h3>
            <button
                onClick={() => {
                    playAgain();
                }}
            >
                <GrPowerReset />
            </button>
        </div>
    );
};

export default SplashScreen;
