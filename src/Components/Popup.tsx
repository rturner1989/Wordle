import React from "react";
import { popupMessage } from "../Library/enums";

interface props {
    popupMessage: popupMessage | null;
}

const Popup: React.FC<props> = ({ popupMessage }) => {
    return (
        <div className="modalContainer">
            <p className="gameMessage">{popupMessage === null ? "" : popupMessage}</p>
        </div>
    );
};

export default Popup;
