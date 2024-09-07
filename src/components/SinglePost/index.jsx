import React, { useEffect, useState, useRef } from "react";
import { marked } from "marked";

import { useNavigate, useParams, Link } from "react-router-dom";
import DOMPurify from "dompurify";

export default function Index() {
  let { postId } = useParams();

  const navigate = useNavigate();
  function handleClick() {
    navigate(-1);
  }

  function handleEdit() {
    setEdit(!edit);
    console.log("asdkfsd");
  }

  const [post, setPost] = useState({});
  const [edit, setEdit] = useState(false);

  const divRef = useRef(null);

  useEffect(() => {
    (async () => {
      const data = await fetch(`/api/post/${postId}`).then((data) =>
        data.json()
      );

      let res = await fetch(`/user/getname?user_id=${data.user_id}`).then(
        (data) => data.json()
      );
      data.userName = res.name;
      setPost(data);

      divRef.current.innerHTML = DOMPurify.sanitize(marked.parse(data.desce));
    })();
  }, [postId]);

  return (
    <div className="flex-[3_3_0%] px-[20px] mt-[20px] justify-center items-center flex-col">
      <div
        className=" p-[10px] w-[100px] cursor-pointer text-[grey] hover:text-[black]"
        onClick={handleClick}
      >
        返回上页
      </div>
      <div>
        <img
          src={
            post.photo
              ? post.photo
              : "https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          }
          alt=""
          className="w-full h-[300px] object-cover rounded-[5px]"
        />
        <div className="text-center text-3xl m-[10px] roboto-bold h-[40px] leading-[40px]">
          {post.title}
          <div className="float-right text-sm flex items-center justify-center h-full">
            <i
              className="iconfont icon-bianji mr-[15px] cursor-pointer text-[teal]"
              onClick={handleEdit}
            ></i>
            <i className="iconfont icon-shanchu  cursor-pointer text-[tomato]"></i>
          </div>
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
    </div>
  );
}
