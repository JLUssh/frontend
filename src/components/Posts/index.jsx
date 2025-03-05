import React, { useState, useEffect } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import Post from "@comp/Post";
export default function Posts() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  const navigate = useNavigate();
  // console.log("Search", search);

  // 不管是按条件还是全部，都做懒加载
  useEffect(() => {
    async function fetchSpecPost(search) {
      setPosts([]);
      const data = await fetch(`/api/post${search}`).then((data) =>
        data.json()
      );
      if (!loadding) {
        setPosts(data);
      }
    }
    async function fetchAllPosts() {
      setPosts([]);
      const data = await fetch("/api/post").then((data) => data.json());
      if (!loadding) {
        setPosts(data);
      }
    }

    // 用于async和await，竞态条件，防止网络延时与冲突
    let loadding = false;

    if (search) {
      //在这里还得进行进一步判断
      let temp = search;
      temp = temp.slice(1);
      let arr = temp.split("=");
      //有不同的查找条件
      if (arr[0] === "user_id" || arr[0] === "cat_id") {
        fetchSpecPost(search);
      } else {
        navigate(-1);
      }
    } else {
      fetchAllPosts();
    }

    return () => {
      loadding = true;
    };
  }, [search]);

  return (
    <div className="flex-[3_3_0%] px-[100px] mt-[20px]">
      {posts.map((post) => (
        // 要知道post数据里面都有哪些元素
        <Post key={post.id} info={post}></Post>
      ))}
    </div>
  );
}
