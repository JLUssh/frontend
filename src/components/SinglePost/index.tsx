import React, { useEffect, useState, useRef, useContext } from "react";
import { marked } from "marked";

import { useNavigate, useParams, Link } from "react-router-dom";
import DOMPurify from "dompurify";

import { Context } from "./../../store";
import PopUpBox from "@comp/PopUpBox";
import Mask from "@comp/Mask";

//// 从后端返回回来的结果
interface Post {
  user_id: number;
  userName: string;
  createdAt: Date;
  photo: string;
  title: string;
}

export default function Index() {
  let { postId } = useParams();

  const navigate = useNavigate();
  function handleClick() {
    navigate(-1);
  }

  function handleEdit() {
    setEdit(!edit);
  }

  async function handleDelete() {
    setShowPopUpBox(true);
  }

  const [post, setPost] = useState<Post>({} as Post);

  const [showBtn, setShowBtn] = useState<boolean>(false);

  const [showPopUpBox, setShowPopUpBox] = useState<boolean>(false);

  const [edit, setEdit] = useState<boolean>(false);

  const divRef = useRef<HTMLDivElement>(null);

  const ctx = useContext(Context),
    user = ctx?.user;

  useEffect(() => {
    (async () => {
      const data = await fetch(`/api/post/${postId}`).then((data) =>
        data.json()
      );

      //// 还是需要存储到本地的
      if (user && user.id === data.user_id) {
        setShowBtn(true);
      }

      let res = await fetch(`/user/getname?user_id=${data.user_id}`).then(
        (data) => data.json()
      );
      data.userName = res.name;
      setPost(data);

      divRef.current &&
        (divRef.current.innerHTML = DOMPurify.sanitize(
          marked.parse(data.desce)
        ));
    })();
  }, [postId]);

  // useEffect(() => {
  //   if (user && user.id === data)
  // }, []);

  return (
    <div className="flex-[3_3_0%] px-[20px] mt-[20px] justify-center items-center flex-col">
      <div
        className=" p-[10px] w-[100px] cursor-pointer text-[grey] hover:text-[black]"
        onClick={handleClick}
      >
        返回上页
      </div>
      <div>
        {post.photo ? (
          <img
            src={post.photo}
            alt=""
            className="w-full h-[300px] object-cover rounded-[5px]"
          />
        ) : null}

        <div className="text-center text-3xl m-[10px] roboto-bold h-[40px] leading-[40px]">
          {post.title}

          {showBtn ? (
            <div className="float-right text-sm flex items-center justify-center h-full">
              <i
                className="iconfont icon-bianji mr-[15px] cursor-pointer text-[teal]"
                onClick={handleEdit}
              ></i>
              <i
                className="iconfont icon-shanchu  cursor-pointer text-[tomato]"
                onClick={handleDelete}
              ></i>
            </div>
          ) : null}
        </div>
        {/* <div className="w-f">
          <ul className="flex w-full items-center justify-center text-[#be9656] text-lg mb-[20px] gap-5">
            <li>Node</li>
            <li>React</li>
          </ul>
        </div> */}
      </div>
      <div className="flex w-full items-center justify-between text-[#be9656] text-lg mb-[20px] ">
        <span>
          作者:&nbsp;
          <Link to={`/?user_id=${post.user_id}`}>
            <b className="ml-[5px] cursor-pointer">{post.userName}</b>
          </Link>
        </span>
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
      </div>
      <div ref={divRef} className="w-full h-auto"></div>

      {showPopUpBox ? (
        <>
          <Mask handleClick={() => setShowPopUpBox(false)}></Mask>
          <PopUpBox
            content={"请问是否确认删除该博客"}
            btnArr={[
              {
                async handleClick() {
                  try {
                    let data = await fetch(`/api/post/${postId}`, {
                      method: "DELETE",
                    });
                    console.log(data);
                    data = await data.json();
                    alert("删除成功");
                    setShowPopUpBox(false);
                    setTimeout(() => {
                      navigate(-1);
                    }, 1000);
                  } catch (error) {
                    console.log(error);
                  }
                },
              },
              {
                handleClick() {
                  setShowPopUpBox(false);
                },
              },
            ]}
          ></PopUpBox>
        </>
      ) : null}
    </div>
  );
}
