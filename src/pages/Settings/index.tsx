import React, { FormEvent, useContext, useState } from "react";
import SideBar from "@/components/SideBar";
import "./index.css";

import { Context } from "../../store";
import avatar from "@ass/avatar.jpg";

const Index: React.FC = () => {
  const { user, dispatch } = useContext(Context);
  if (!user) {
    return;
  }

  const [email, setEmail] = useState(user.email);
  const [name, setName] = useState(user.name);
  const [password, setPassword] = useState("");
  const [file, setFile] = useState<File | null>(null);

  function handleFile(e) {
    // console.log(e.target.files[0]);
    //从FileList获取第一个File Object
    setFile((e.target as HTMLInputElement).files[0]);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const data = new FormData();

    data.append("avatar", file);

    data.append("name", name);
    data.append("email", email);
    data.append("password", password);

    // console.log(data);

    // let d = {
    //   name,
    //   email,
    //   password,
    //   // file: data,
    // };

    // d = JSON.stringify(d);
    // console.log(d);
    // 不应该是一起的吗？为什么分两步
    try {
      // 主要是这个res使得state发生改变
      const res = await fetch("/user/" + user.id + "/upload", {
        method: "PUT",
        // headers: {
        //   "Content-Type": "multipart/form-data",
        // },
        // body: JSON.stringify(file),
        body: data,
      }).then((data) => data.json());

      console.log(res);

      if (res) {
        let payload = res;
        payload.avatar_url = res.avatar_url ? res.avatar_url : user.avatar_url;
        dispatch({
          type: "UPDATE_SUCCESS",
          payload,
        });
        alert("信息更新成功");
      }
    } catch (error) {}
  }

  return (
    <div className="flex">
      <div className="flex-[3_3_0%] p-[20px] ">
        <div className="flex items-center justify-between">
          <span className="text-2xl mb-[20px] text-[lightcoral]">
            Update Your Account
          </span>
          <span className="text-sm text-[red] cursor-pointer">
            Delete Account
          </span>
        </div>
        <form className="settingsForm flex flex-col" onSubmit={handleSubmit}>
          <label>个人头像</label>
          <div className="flex items-center my-[10px]">
            <img
              // src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              src={
                file
                  ? URL.createObjectURL(file)
                  : user.avatar_url
                  ? user?.avatar_url
                  : avatar
              }
              alt=""
              className="h-[70px] w-[70px] rounded-[20px] object-cover"
            />
            <label htmlFor="fileInput" className="ml-[20px]">
              <i className="iconfont icon-yonghu w-[25px] h-[25px] p-[5px] flex items-center justify-center border-none rounded-full ml-[10ox] text-white bg-[lightcoral] cursor-pointer"></i>{" "}
            </label>
            <input
              name="avatar"
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              className="w-[30%]"
              onChange={handleFile}
            />
          </div>
          <label>Username</label>
          <input
            type="text"
            placeholder="Safak"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            placeholder="safak@gmail.com"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            autoComplete="off"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button
            className="self-center w-[150px] border-none text-white bg-cyan-500 p-[10px] mt-[20px] cursor-pointer flex items-center justify-center hover:bg-cyan-600"
            type="submit"
          >
            Update
          </button>
        </form>
      </div>
      <SideBar />
    </div>
  );
};

export default Index;
