import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";

export default function Index() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isReg, setIsReg] = useState(false);
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    //阻止表单提交的默认行为：重新刷新页面
    e.preventDefault();

    setIsReg(true);
    let d = {
      name,
      email,
      password,
    };

    d = JSON.stringify(d);

    const data = await fetch("/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // // body data type must match "Content-Type" header
      body: d,
    }).then((d) => d.json());

    setIsReg(false);

    data ? setMsg("注册成功,将跳转至登陆页面...") : setMsg("注册失败");

    setTimeout(() => {
      navigate("/login");
      setMsg("");
    }, 2000);
    // setTimeout(() => {
    //   setIsReg(false);
    // }, 2000);
  }

  return (
    <div className="register w-full flex flex-col justify-center items-center relative">
      <span className="text-[40px]  roboto-bold">注册页面</span>
      <form className="flex flex-col mt-[20px]" onSubmit={handleSubmit}>
        <label htmlFor="userName" className="my-[10px]">
          用户名
        </label>
        <input
          id="userName"
          className="p-[10px] bg-[white] border-none rounded-[10px]"
          type="text"
          placeholder="Enter your email..."
          autoComplete="off"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
          className="mt-[20px] bg-cyan-500 cursor-pointer p-[10px] border-none text-white rounded-[10px] text-center"
          style={{
            backgroundColor: isReg ? "lightblue" : "lightskyblue",
          }}
        >
          {/* <button type="submit">注册</button> */}
          注册
        </button>
      </form>
      {msg ? (
        <span className="self-center justify-self-center text-[lightcoral] mt-[20px] text-sm">
          {msg}
        </span>
      ) : null}
      <Link
        to="/login"
        className="absolute top-[60px] right-[20px] bg-cyan-500 cursor-pointer p-[10px] border-none text-white rounded-[10px]"
      >
        登录
      </Link>
    </div>
  );
}
