// import React, { useEffect, useContext } from "react";
import React, { useContext } from "react";

//一个默认的头像
import avatar from "@ass/avatar.jpg";

import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../store";
// 重新渲染都涉及不到它，怎么让他进行更新啊？
const TopBar: React.FC = () => {
  const { user, dispatch } = useContext(Context);
  console.log(user);
  const navigate = useNavigate();

  function handleLogout() {
    dispatch?.({
      type: "LOGOUT",
      payload: null,
    });
    navigate("/");
  }

  // console.log(user.avatar_url);

  return (
    // position stick
    //  border-b-2 border-solid border-slate-300
    <div
      className="bg-white w-full h-[50px] sticky top-0 flex zcool-kuaile-regular justify-items-center items-center z-50"
      //   style={{ fontFamily: "'Roboto', sans-serif" }}
    >
      <div className="flex-1 flex  justify-center items-center">
        <Link
          to="/"
          className="iconfont icon-boke text-4xl font-bold cursor-pointer"
        ></Link>
      </div>
      <div className="flex-[2_2_0%]">
        <ul className="h-full flex justify-center m-0 p-0 items-center text-[#666]">
          <li className="mx-5  text-xl cursor-pointer hover:text-[#222]">
            <Link to="/">主页</Link>
          </li>
          <li className="mx-5 text-xl cursor-pointer hover:text-[#222]">
            <Link to="/aboutMe">关于</Link>
          </li>
          <li className="mx-5  text-xl cursor-pointer hover:text-[#222]">
            <Link to="/concat">联系</Link>
          </li>

          {
            user ? (
              <>
                <li className="mx-5 text-xl cursor-pointer hover:text-[#222]">
                  <Link to="/write">写作</Link>
                </li>
                <li
                  className="mx-5 text-xl cursor-pointer hover:text-[#222]"
                  onClick={handleLogout}
                >
                  登出
                </li>
              </>
            ) : null
            // (
            //   // <>
            //   //   <li className="mr-10 text-xl cursor-pointer hover:text-[#222]">
            //   //     <Link to="/">主页</Link>
            //   //   </li>
            //   //   <li className="mr-10 text-xl cursor-pointer hover:text-[#222]">
            //   //     关于
            //   //   </li>
            //   //   <li className="mr-10 text-xl cursor-pointer hover:text-[#222]">
            //   //     联系
            //   //   </li>
            //   // </>
            // )
          }
        </ul>
      </div>
      <div className="flex-1 flex justify-center items-center">
        {/* 应该是从服务器中获取到的 绝对路径 */}

        {user ? (
          <>
            <Link to="/settings">
              <img
                src={user.avatar_url ? user.avatar_url : avatar}
                alt="avatar"
                className="w-[40px] h-[40px] rounded-full object-cover cursor-pointer mr-2 border-sky-400 border-2"
              />
            </Link>

            <i className="iconfont icon-sousuo ml-2 text-2xl cursor-pointer"></i>
          </>
        ) : (
          <>
            <ul className="flex justify-center m-0 p-0 items-center text-[#666]">
              <li className="mr-10 text-xl cursor-pointer hover:text-[#222]">
                <Link to="login">登录</Link>
              </li>
              <li className="mr-5 text-xl cursor-pointer hover:text-[#222]">
                <Link to="/register">注册</Link>
              </li>
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default TopBar;
