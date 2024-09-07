// import { createContext, } from "react";

import React, { createContext, useReducer, useEffect } from "react";
import reducer from "./rootReducer";

import { UserInfo, CTX } from "../typescript/interfaces";

//可能已经登陆
let userInfo = localStorage.getItem("user");
const INITIAL_STATE: UserInfo = {
  user: userInfo ? JSON.parse(userInfo) : null,
};

const CONTEXT_VALUE: CTX = {
  user: INITIAL_STATE.user,
  dispatch: null,
};

// console.log(INITIAL_STATE.user);
export const Context = createContext<CTX>(CONTEXT_VALUE);

// wrapper
export const ContextProvider = ({ children }) => {
  //会调用一次reducer
  const [states, dispatch] = useReducer(reducer, INITIAL_STATE);
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(states.user));
  }, [states.user]);
  console.log(states.user);
  return (
    <Context.Provider
      value={{
        user: states.user,
        dispatch: dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};
