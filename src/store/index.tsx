// import { createContext, } from "react";

import React, { createContext, useReducer, useEffect, useContext } from "react";
import reducer from "./rootReducer";

import { UserInfo, CTX, baseUserInfo } from "../typescript/interfaces";
import useLocalStorage from "@/hooks/useLocalStorage";
// import {baseUserInfo}
//可能已经登陆
// let userInfo = localStorage.getItem("user");
// const INITIAL_STATE: UserInfo = {
//   user: userInfo ? JSON.parse(userInfo) : null,
// };

// const CONTEXT_VALUE: CTX = {
//   user: INITIAL_STATE.user,
//   dispatch: null,
// };

// console.log(INITIAL_STATE.user);
// export const Context = createContext<CTX>(CONTEXT_VALUE);
export const Context = createContext<CTX | null>(null);

// wrapper
export const ContextProvider = ({ children }) => {
  // 把用户信息的获取和设置提取为一个hook
  const [user, setValue]: [baseUserInfo, Function] = useLocalStorage(
    "user",
    null
  );
  const INITIAL_STATE: UserInfo = { user: user };
  //会调用一次reducer

  const [states, dispatch] = useReducer(reducer, INITIAL_STATE);
  useEffect(() => {
    // localStorage.setItem("user", JSON.stringify(states.user));
    console.log("useEffect:");
    console.log(states.user);
    console.log(JSON.stringify(states.user));
    setValue(states.user);
  }, [states.user]);

  // 还是基于context，实现组件中状态的共享和管理
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
