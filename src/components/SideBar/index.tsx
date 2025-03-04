import React, { useEffect, useState } from "react";
import avatar from "@ass/avatar.jpg";
import { Link } from "react-router-dom";

interface CategoryInfo {
  id: number;
  name: string;
}

export default function Index() {
  // 只能在组件或自定义组件中使用
  // 首字母要大写
  const [categories, setCategories] = useState<CategoryInfo[]>([]);

  useEffect(() => {
    let isLoadding = false;
    (async () => {
      setCategories([]);
      const data = await fetch("/api/category").then((data) => data.json());
      // console.log(data);
      if (!isLoadding) {
        setCategories(data);
      }
    })();
    return () => {
      isLoadding = true;
    };
  }, []);

  return (
    <div className="flex-1 mt-[20px] pb-[30px] h-fit rounded-[10px] bg-[#fbfbfb] min-w-[300px]">
      <div className="flex flex-col items-center">
        <span className="roboto-bold-italic w-[80%] p-[5px] m-[10px] border-y-2 border-slate-300 text-center text-[#222] font-semibold leading-[20px] text-[15px]">
          ABOUT ME
        </span>
        <img
          src={avatar}
          alt=""
          className="w-[250px] h-[250px] mt-[15px] object-cover"
        />
        <p className="p-[30px] text-left">
          Laboris sunt aute cupidatat velit magna velit ullamco dolore mollit
          amet ex esse.Sunt eu ut nostrud id quis proident.
        </p>
      </div>
      <div className="flex flex-col items-center">
        <span className="roboto-bold-italic w-[80%] p-[5px] m-[10px] border-y-2 border-slate-300 text-center text-[#222] font-semibold leading-[20px] text-[15px]">
          CATEGORIES
        </span>
        <ul className="flex flex-wrap mb-[30px] text-center">
          {categories.map((cat) => (
            <Link
              // 在局部保持唯一就可以
              to={`/?cat_id=${cat.id}`}
              key={cat.id}
              className="flex-[1_1_50%] mt-[15px] cursor-pointer"
            >
              {cat.name}
            </Link>
          ))}
          {/* <li className="flex-[1_1_50%] mt-[15px] cursor-pointer">Life</li>
          <li className="flex-[1_1_50%] mt-[15px] cursor-pointer">Music</li>
          <li className="flex-[1_1_50%] mt-[15px] cursor-pointer">Sport</li>
          <li className="flex-[1_1_50%] mt-[15px] cursor-pointer">Style</li>
          <li className="flex-[1_1_50%] mt-[15px] cursor-pointer">Tech</li>
          <li className="flex-[1_1_50%] mt-[15px] cursor-pointer">Cinema</li> */}
        </ul>
      </div>
      <div className="flex flex-col items-center">
        <span className="roboto-bold-italic w-[80%] p-[5px] m-[10px] border-y-2 border-slate-300 text-center text-[#222] font-semibold leading-[20px] text-[15px]">
          FOLLOW US
        </span>
        <div className="flex flex-row justify-between w-[40%]">
          <i className="iconfont icon-QQ text-2xl cursor-pointer"></i>
          <i className="iconfont icon-wechat-fill text-2xl cursor-pointer"></i>
          <i className="iconfont icon-github-fill text-2xl cursor-pointer"></i>
        </div>
      </div>
    </div>
  );
}
