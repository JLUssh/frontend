import React, { FormEvent, useContext, useState, useRef, useMemo } from "react";
import { Context } from "../../store";
import { marked } from "marked";
import { throttle, debounce } from "./../../utils";
import DOMPurify from "dompurify";

// function markParse(target, value) {
//   target.innerHTML = marked.parse(value);
//   // console.log(value);
// }
// const newMarkParse = debounce(markParse, 2000);

export default function Write() {
  const [title, setTitle] = useState("");
  const [desce, setDesce] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const divRef = useRef(null);
  const { user } = useContext(Context);

  const newMarkParse = useMemo(() => {
    function markParse(target, value) {
      target.innerHTML = DOMPurify.sanitize(marked.parse(value));
      // console.log(value);
    }
    const newMarkParse = debounce(markParse, 2000);
    return newMarkParse;
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    // 不阻止默认行为，会导致重新提交表单
    e.preventDefault();

    const data = new FormData();

    // 这个要保持一致
    if (file !== null) {
      data.append("bgImg", file);
    }

    // 基本信息
    data.append("title", title);
    data.append("desce", desce);

    try {
      // 主要是这个res使得state发生改变
      const res = await fetch("/user/" + user?.id + "/uploadPost", {
        method: "PUT",
        // headers: {
        //   "Content-Type": "multipart/form-data",
        // },
        // body: JSON.stringify(file),
        body: data,
      }).then((data) => data.json());

      console.log(res);

      if (res) {
        window.alert("新博客创建成功!");
      }
    } catch (error) {}
  };

  return (
    <div className="pt-[50px]  w-[70vw] mx-auto">
      {file && (
        <img
          className="mx-auto w-full h-[250px] rounded-[10px] object-cover"
          src={URL.createObjectURL(file)}
          alt=""
        />
      )}
      <form className="mx-2 relative" onSubmit={handleSubmit}>
        <div className="flex items-center">
          <label
            htmlFor="fileInput"
            className="flex justify-center items-center"
          >
            <i className="iconfont icon-tianjia text-[25px] cursor-pointer"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile((e.target as HTMLInputElement).files![0])}
          />
          <input
            type="text"
            placeholder="Title"
            className="text-[30px] border-none p-[20px] w-full focus:outline-none"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex items-center relative">
          {/* 编辑区域 */}
          <div className="w-[50%] p-[20px] text-[20px] h-[100vh] border-2 border-dashed box-border rounded bg-slate-200">
            <textarea
              wrap="off"
              placeholder="Tell your story..."
              className="w-full text-[20px] h-full focus:outline-none  box-border  resize-none rounded overflow-auto"
              onChange={(e) => {
                setDesce(e.target.value);
                //这里可以加一个节流？
                newMarkParse(divRef.current, e.target.value);
              }}
            ></textarea>
          </div>

          {/* 用以改变两边宽度大小 */}
          <div className="absolute left-[50%] translate-x-[-100%] w-2 h-[100vh] cursor-ew-resize will-change-transform before:content-[''] before:block before:w-full before:h-full before:bg-slate-500/50 before:mx-0 before:my-auto">
            <div className="flex rounded-full w-[30px] h-[30px] absolute bg-orange-300/75 left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%] text-sm select-none font-bold text-center items-center">
              <span className="flex-1 text-green-500">&lt;</span>
              <span className="flex-1 text-blue-500">&gt;</span>
            </div>
          </div>
          {/* 效果展示区域 */}
          <div className="w-[50%] p-[20px] text-[20px] h-[100vh] border-2 border-dashed box-border rounded">
            <div
              ref={divRef}
              className="w-full h-full  overflow-auto box-border"
            ></div>
          </div>
        </div>
        <button
          className="absolute top-[20px] right-[0px] text-white bg-[teal] p-[10px] border-none rounded-[10px] cursor-pointer text-[16px]"
          type="submit"
        >
          Publish
        </button>
      </form>
    </div>
  );
}
