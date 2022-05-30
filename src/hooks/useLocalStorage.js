import {useEffect, useState} from "react";

function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        const items = localStorage.getItem(key);

        return items ? JSON.parse(items) : initialValue;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}

export default useLocalStorage;