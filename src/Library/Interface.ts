import { keyState } from "./enums";

export type singleWord = {
    word: string;
};

export type gameDifficulty = {
    diffName: string;
    diffMode: string;
};

export type keyType = {
    keyTrigger: string;
    state: keyState;
};
