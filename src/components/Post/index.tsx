import React, { useEffect, useState } from "react";
// import img from "@ass/1.jpeg";
import { Link } from "react-router-dom";

import "./index.css";
import loading from "./loading.gif";
import { Post } from "@/typescript/interfaces";

interface IProps {
  info: Post;
}

const Index: React.FC<IProps> = ({ info }) => {
  //
  // const { info, children } = props;
  // console.log(props);
  // 没有给图片的话，使用默认图片
  const [labels, setLabels] = useState<string[]>([]);
  // console.log(info);
  useEffect(() => {
    let flag = true;
    (async () => {
      // console.log(info.id);
      const data = await fetch(`/api/post/${info.id}/labels`).then((data) =>
        data.json()
      );

      //// 一个是中断请求，一个是不使用请求后的结果
      if (flag) {
        setLabels(data.labels);
      }
      console.log(data);
    })();

    return () => {
      flag = false;
    };
  }, [info.id]);

  // let imgSrc = info.photo ? info.photo : img;

  return (
    <div className="flex mb-[40px] h-[200px] w-full">
      {info.photo ? (
        <div className="w-[300px] h-full">
          <Link to={`/post/${info.id}`}>
            <img
              // src={info.photo}
              data-src={info.photo}
              src={loading}
              alt="placeholder"
              className="lazy w-full h-full object-cover rounded-[5px] cursor-pointer"
            />
          </Link>
        </div>
      ) : null}
      <div className="flex flex-col justify-between w-full px-5 h-full">
        <div className="flex justify-between w-full">
          <span className="text-[20px] hover:text-[#888] cursor-pointer flex-1 truncate">
            <Link to={`/post/${info.id}`}>
              <strong>{info.title}</strong>
              {/* <strong>
                {
                  "11111111111111111111111111111111111111111111111111111111111111111111"
                }
              </strong> */}
            </Link>
          </span>
          <span className="text-[15px] text-[#999] width-[100px]">
            {/* 进行日期格式的处理 */}
            <i>{new Date(info.createdAt).toLocaleDateString()}</i>
          </span>
        </div>
        <div className=" zcool-kuaile-regular text-[#444] flex-1 overflow-hidden">
          <span className="postContent">{info.desce}</span>
        </div>
        <div className="h-[30px]">
          <ul className="flex justify-end gap-4 h-full">
            {labels.map((label) => (
              <li
                key={label}
                className="rounded-[5px] px-2 border-2 text-[#be9656] leading-[26px] select-none"
              >
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Index;
