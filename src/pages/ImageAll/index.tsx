import React, { useState, useEffect, useRef } from "react";
import Image from "@comp/Image";
import { throttle } from "../../utils";
import avatar from "@ass/avatar.jpg";
import loading from "@ass/loading.png";

export default function Index() {
  const [show, setShow] = useState([]);
  const cur = useRef(0);
  useEffect(() => {
    let temp = [];
    for (let i = 0; i < 200; i++) {
      temp.push(Image);
    }
    setShow([...temp]);
    window.addEventListener("scroll", throttle(checkImage, 200));
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  function checkImage() {
    console.log(cur.current);
    // 可见区域高度

    let height = window.innerHeight;
    // 滚动条距离
    let curTop = document.body.scrollTop || document.documentElement.scrollTop;

    // console.log(show.length);
    const img = document.querySelectorAll("img");
    // console.log(img);
    for (let i = cur.current; i < show.length; i++) {
      // let img = show[i];
      console.log(img[i].offsetTop);
      if (img[i].offsetTop < curTop + height) {
        console.log(img[i].getAttribute("src"));
        if (img[i].getAttribute("src") === loading) {
          img[i].src = avatar;
          cur.current = i + 1;
        }
      }
    }
  }
  return (
    <div className="w-full flex-wrap flex-4">
      {show.map((Comp) => {
        return <Comp />;
      })}
    </div>
  );
}
