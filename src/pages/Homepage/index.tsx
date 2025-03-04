import Header from "@comp/Header";
import Posts from "@comp/Posts";
import SideBar from "@/components/SideBar";

import React, { useEffect } from "react";

import { getAllPosts } from "@/contacts";

export const loader = async () => {
  const data = await getAllPosts();
  return { data };
};

export default function Index() {
  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        // let info = await fetch("http://localhost:5000/getInfo", {
        //   // body: JSON.stringify("123"),
        //   mode: "cors",
        //   credentials: "include",
        //   signal: controller.signal,
        // }).then((data) => data.json());
        let response = await fetch("http://localhost:5000/getInfo", {
          // body: JSON.stringify("123"),
          mode: "cors",
          credentials: "include",
          signal: controller.signal,
        });
        console.log("response.status:");
        console.log(response.status);
        console.log(response.ok);
        let data = await response.json();
        console.log(data);
        //// promise 的中断取消
        // function test(signal: any = null, delay = 2000) {
        //   return new Promise((resolve, reject) => {
        //     let timerId = setTimeout(() => {
        //       resolve(Math.floor(Math.random() * 100000));
        //     }, delay);
        //     if (signal instanceof AbortSignal) {
        //       signal.addEventListener(
        //         "abort",
        //         () => {
        //           clearTimeout(timerId);
        //           reject("cancel request");
        //         },
        //         {
        //           once: true,
        //         }
        //       );
        //     }
        //   });
        // }
        // test(controller.signal)
        //   .then((res) => console.log(res))
        //   .catch((error) => console.log(error));
      } catch (error) {
        console.log(error);
      }
    })();
    window.scrollTo(0, 0);

    return () => {
      // 中断请求 会报错，要进行相应的捕捉
      controller.abort("cancel request");
    };
  });

  return (
    <>
      <Header />
      <div className="flex">
        <Posts></Posts>
      </div>
    </>
  );
}
