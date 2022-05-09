import React from "react";
import { useCookies } from "react-cookie";

const useUserID = () => {
    const COOKIE_NAME = "flow-user-id";

    const [ cookies, setCookie, removeCookie ] = useCookies();

    const setUserID = (id) => {
        setCookie(COOKIE_NAME, id);
    }

    const removeUserID = () => {
        removeCookie(COOKIE_NAME);
    }

    return [
        cookies[COOKIE_NAME],
        setUserID,
        removeUserID
    ]

}

export default useUserID;