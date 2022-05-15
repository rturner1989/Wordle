import { gameDifficulty, keyState } from "./enums";

export type keyType = {
    keyTrigger: string;
    state: keyState;
};

export type difficulty = {
    mode: gameDifficulty;
    words: string[];
};
