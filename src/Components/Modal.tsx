import React from "react";
import { modalMessage } from "../Library/enums";

interface props {
    modalMessage: modalMessage | null;
}

const Modal: React.FC<props> = ({ modalMessage }) => {
    return (
        <div className="modalContainer">
            <p className="gameMessage">{modalMessage === null ? "" : modalMessage}</p>
        </div>
    );
};

export default Modal;
