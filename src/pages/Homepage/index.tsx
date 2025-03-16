import Header from "@/components/Header";
import Posts from "@/components/Posts";
// import SideBar from "@/components/SideBar";

import React, { useEffect } from "react";

import { getAllPosts } from "@/contacts";
import Calendar from "@/components/Calendar";

export const loader = async () => {
  const data = await getAllPosts();
  return { data };
};

export default function Index() {
  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        console.log("here");
        const request = new Request("http://localhost:5000/getInfo", {
          mode: "cors",
          credentials: "include",
          signal: controller.signal,
        });

        let response = await fetch(request);
        // let response = await fetch("http://localhost:5000/getInfo", {
        //   // body: JSON.stringify("123"),
        //   mode: "cors",
        //   credentials: "include",
        //   signal: controller.signal,
        // });
        console.log("response.status:");
        console.log(response);
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
        <Calendar />
      </div>
    </>
  );
}
