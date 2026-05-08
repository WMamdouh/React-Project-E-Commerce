import { useState } from "react";
import { createContext } from "react";

export let CounterContext = createContext(0);

export function CounterContextProvider(props) {

    let [count, setCount] = useState(10);
    let [userName, setUserName] = useState('waleed');

    return <CounterContext.Provider value={{ count, userName }}>
        {props.children}
    </CounterContext.Provider>
}

