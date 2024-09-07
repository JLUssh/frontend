import React, { useState, useContext } from "react";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";

import { Context } from "../../store";
// 将用户信息存储到localStorage中，存储到本地
export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [msg, setMsg] = useState("");

  const { dispatch } = useContext(Context);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    //阻止表单提交的默认行为：重新刷新页面
    e.preventDefault();
    // console.log("object");
    setIsLogin(true);

    let d = {
      email,
      password,
    };

    let newD = JSON.stringify(d);
    // console.log(d);
    const data = await fetch("/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // // body data type must match "Content-Type" header
      body: newD,
    }).then((data) => data.json());

    // console.log(data);

    setIsLogin(false);

    if (typeof data !== "string") {
      setMsg("登录成功,将跳转至主页面...");

      // localStorage.setItem("userInfo", JSON.stringify(data));
      console.log(data);
      setTimeout(() => {
        navigate("/");
        setMsg("");
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: data,
        });
      }, 2000);
    } else {
      setMsg(data);
      setTimeout(() => {
        setMsg("");
        setEmail("");
        setPassword("");
      }, 2000);
    }

    // setTimeout(() => {
    //   navigate("/");
    //   setMsg("");
    // }, 2000);
    // setTimeout(() => {
    //   setIsLogin(false);
    // }, 2000);
  }

  return (
    <div className="loginPage w-full flex flex-col justify-center items-center relative">
      <span className="text-[40px] roboto-bold">登录页面</span>
      <form className="flex flex-col mt-[20px]" onSubmit={handleSubmit}>
        <label htmlFor="userEmail" className="my-[10px]">
          Email
        </label>
        <input
          id="userEmail"
          className="p-[10px] bg-[white] border-none rounded-[10px]"
          type="text"
          placeholder="Enter your email..."
          autoComplete="off"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="userPassword" className="my-[10px]">
          Password
        </label>
        <input
          id="userPassword"
          className="p-[10px] bg-[white] border-none rounded-[10px]"
          type="password"
          placeholder="Enter your password..."
          autoComplete="off"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="mt-[20px] cursor-pointer p-[10px] border-none text-white rounded-[10px]"
          style={{
            backgroundColor: isLogin ? "lightblue" : "lightskyblue",
          }}
        >
          登录
        </button>

        {msg ? (
          <span className="self-center justify-self-center text-[coral] mt-[20px] text-sm">
            {msg}
          </span>
        ) : null}
      </form>
      <Link
        to="/register"
        className="absolute top-[60px] right-[20px] bg-cyan-500 cursor-pointer p-[10px] border-none text-white rounded-[10px]"
      >
        注册
      </Link>
    </div>
  );
}
