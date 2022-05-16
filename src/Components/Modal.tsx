import React from "react";
import { modalMessage } from "../Library/enums";

interface props {
    modalMessage: modalMessage | null;
}

const Modal: React.FC<props> = ({ modalMessage }) => {
    return <div>{modalMessage === null ? "" : modalMessage}</div>;
};

export default Modal;
