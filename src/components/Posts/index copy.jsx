import React, { useState, useEffect } from "react";

import { useLocation } from "react-router-dom";

import Post from "@comp/Post";
export default function Index() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  console.log("Search", search);

  useEffect(() => {
    if (search) {
      //在这里还得进行进一步判断
      let temp = search;
      temp = temp.slice(1);
      let arr = temp.split("=");
      if (arr[0] === "user_id" || arr[0] === "cat_id") {
        (async () => {
          const data = await fetch(`/api/post${search}`).then((data) =>
            data.json()
          );
          // console.log(data);
          setPosts(data);
        })();
      }
    } else {
      const getAllPosts = async () => {
        const data = await fetch("/api/post").then((data) => data.json());
        setPosts(data);
      };
      getAllPosts();
    }
  }, [search]);

  return (
    <div className="flex-[3_3_0%] p-[50px] mt-[20px]">
      {posts.map((post) => (
        // 要知道post数据里面都有哪些元素
        <Post key={post.id} info={post}></Post>
      ))}
    </div>
  );
}
