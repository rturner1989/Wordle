import React, { SetStateAction, useCallback, useEffect, useState } from "react";

type SetValue<T> = React.Dispatch<SetStateAction<T>>;

const useLocalStorage = <T>(key: string, initialValue: T): [T, SetValue<T>] => {
    const readValue = useCallback((): T => {
        if (typeof window === "undefined") {
            return initialValue;
        }

        try {
            const item = window.localStorage.getItem(key);
            return item ? (JSON.parse(item) as T) : initialValue;
        } catch (error) {
            console.warn(`Error reading localStorage key ${key}:`, error);
            return initialValue;
        }
    }, [initialValue, key]);

    const [storedValue, setStoredValue] = useState<T>(readValue);

    useEffect(() => {
        if (storedValue) {
            if (typeof window == "undefined") {
                console.warn(`Tried setting localStorage key “${key}” even though environment is not a client`);
            }

            try {
                window.localStorage.setItem(key, JSON.stringify(storedValue));
            } catch (error) {
                console.warn(`Error setting localStorage key “${key}”:`, error);
            }
        }
    }, [storedValue, key]);

    return [storedValue, setStoredValue];
};

export default useLocalStorage;
