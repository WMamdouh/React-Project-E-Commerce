import { use, useEffect, useState } from "react";
import { createContext } from "react";

export let UserContext = createContext();

export function UserContextProvider(props) {

    let [userLogin, setUserLogin] = useState(null);
    useEffect(() => {
        const storedUser = localStorage.getItem("userToken");
        if (storedUser) {
            setUserLogin(localStorage.getItem("userToken"));
        }
    }, []);


    return <UserContext.Provider value={{ userLogin, setUserLogin }}>
        {props.children}
    </UserContext.Provider>
}

