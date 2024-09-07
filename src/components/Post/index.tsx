import React, { useEffect, useState } from "react";
// import img from "@ass/1.jpeg";
import { Link } from "react-router-dom";

import "./index.css";

interface IProps {
  info: {
    id: number;
    photo: string;
    title: string;
    createdAt: string;
    desce: string;
  };
}

const Index: React.FC<IProps> = (props) => {
  //
  const { info, children } = props;
  // console.log(props);
  // 没有给图片的话，使用默认图片
  const [labels, setLabels] = useState([]);
  // console.log(info);
  useEffect(() => {
    (async () => {
      // console.log(info.id);
      const data = await fetch(`/api/post/${info.id}/labels`).then((data) =>
        data.json()
      );

      setLabels(data.labels);
      // console.log(data);
    })();
  }, [info.id]);

  // let imgSrc = info.photo ? info.photo : img;

  return (
    <div className="flex mb-[40px] h-[200px] w-full">
      {/* <div className="w-[300px] h-full"> */}
      {info.photo ? (
        <div className="w-[300px] h-full">
          <img
            src={info.photo}
            alt=""
            className="w-full h-full object-cover rounded-[5px] cursor-pointer"
          />
        </div>
      ) : null}
      {/* </div> */}
      <div className="flex flex-col justify-between w-full px-5">
        <div className="flex justify-between w-full">
          <span className="text-[20px] hover:text-[#888] cursor-pointer">
            <Link to={`/post/${info.id}`}>
              <strong>{info.title}</strong>
            </Link>
          </span>
          <span className="text-[15px] text-[#999]">
            {/* 进行日期格式的处理 */}
            <i>{new Date(info.createdAt).toLocaleDateString()}</i>
          </span>
        </div>
        <div className="postContent zcool-kuaile-regular  text-[#444]">
          {info.desce}
        </div>
        <div>
          <ul className="flex justify-end gap-4 h-[30px]">
            {labels.map((label) => (
              <li
                key={label}
                className="rounded-[5px] px-2 border-2 text-[#be9656] leading-[26px]"
              >
                {label}
              </li>
            ))}
            {/* <li className="rounded-[5px] p-1 border-2 text-[#be9656]">Node</li>
            <li className="rounded-[5px] p-1 border-2 text-[#be9656]">React</li> */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Index;
