import React, {
  FormEvent,
  useContext,
  useState,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { Context } from "../../store";
import { marked } from "marked";
import { throttle, debounce } from "./../../utils";
import DOMPurify from "dompurify";

// import style from "./index.module.css";

// function markParse(target, value) {
//   target.innerHTML = marked.parse(value);
//   // console.log(value);
// }
// const newMarkParse = debounce(markParse, 2000);

export default function Write() {
  // console.log(style);
  const [title, setTitle] = useState("");
  const [desce, setDesce] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const divRef = useRef<HTMLDivElement>(null),
    editRef = useRef<HTMLDivElement>(null),
    showRef = useRef<HTMLDivElement>(null);

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
    e.stopPropagation();
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
      let res = await fetch("/user/" + user?.id + "/uploadPost", {
        method: "PUT",
        // headers: {
        //   "Content-Type": "multipart/form-data",
        // },
        // body: JSON.stringify(file),
        body: data,
      });
      // 通过res.ok 进行初步的判断，然后根据相应的状态码，去进行更加详细的判断，显示不同的内容

      if (!res.ok) {
        console.log("res.ok:");
        console.log(res.ok);
        console.log(res.status);
        setDesce("");
        divRef.current && (divRef.current.innerHTML = "");
        window.alert("博客内容超出范围");
        return;
      }
      res = await res.json();
      console.log(res);

      if (res) {
        setTitle("");
        setDesce("");
        setFile(null);
        divRef.current && (divRef.current.innerHTML = "");
        window.alert("新博客创建成功!");
        console.log("here");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleMouseDown = useCallback(function handleMouseDown(e) {
    e.stopPropagation();
    e.preventDefault();

    // 只监听鼠标左键按下事件
    if (e.button !== 0) return false;

    //只需要对x进行操作
    let dom = e.target,
      domWidth = parseFloat(getComputedStyle(dom).width);
    // console.log(domWidth);
    let parentWidth = dom.parentElement.getBoundingClientRect().width;
    let initialX = e.clientX;

    let editDom = editRef.current,
      showDom = showRef.current;
    // 通过getComputedStyle获取样式
    // margin = parseFloat(getComputedStyle(editDom).padding);

    function moveElement(e) {
      if (!editDom || !showDom) {
        return;
      }
      e.stopPropagation();

      let currentX = e.clientX;
      let deltaX = currentX - initialX;

      let editDomRect = editDom.getBoundingClientRect(),
        editWidth = editDomRect.width,
        showDomRect = showDom.getBoundingClientRect(),
        showWidth = showDomRect.width;
      // console.log(editDom.getBoundingClientRect());
      // console.log(dom.offsetLeft);
      // if (showWidth <= 100 && deltaX > 0) {
      //   return;
      // }
      // if (editWidth <= 100 && deltaX < 0) {
      //   dom.style.left = 100 + "px";
      //   return;
      // }
      // console.log(deltaX);
      // console.log();

      // if (dom.offsetLeft + deltaX < 100 || dom.offsetLeft + deltaX )

      let newLeft = dom.offsetLeft + deltaX;

      if (newLeft <= 100) {
        dom.style.left = 100 + "px";
        editDom.style.width = 100 + "px";
        return;
      } else if (newLeft >= parentWidth - 100 - domWidth) {
        dom.style.left = parentWidth - 100 - domWidth + "px";
        showDom.style.width = 100 + "px";
        return;
      }

      dom.style.left = newLeft + "px";

      editDom.style.width = editWidth + deltaX + "px";
      showDom.style.width = showWidth - deltaX + "px";

      initialX = currentX;
    }

    function removeElement(e) {
      e.stopPropagation();
      document.removeEventListener("mousemove", moveElement);
      document.removeEventListener("mouseup", removeElement);
    }

    document.addEventListener("mousemove", moveElement);
    document.addEventListener("mouseup", removeElement);
  }, []);

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
            // style={{ display: "none" }}
            className="hidden"
            // onChange={(e) => setFile((e.target as HTMLInputElement).files![0])}
            // value={file}
            onChange={(e) => setFile(e.target.files![0])}
          />
          <input
            type="text"
            placeholder="Title"
            // className={
            //   "text-[30px] border-none p-[20px] w-full focus:outline-none " +
            //   style.test
            // }
            className="text-[30px] border-none p-[20px] w-full focus:outline-none"
            autoFocus={true}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex items-center relative">
          {/* 编辑区域 */}
          <div
            ref={editRef}
            className="w-[50%] p-[20px] text-[20px] h-[100vh] border-[2px] border-dashed box-border rounded bg-slate-200 overflow-auto"
          >
            <textarea
              wrap="off"
              placeholder="Tell your story..."
              className="block w-full text-[20px] h-full focus:outline-none  resize-none box-border bg-inherit"
              value={desce}
              onChange={(e) => {
                let content = e.target.value;
                setDesce(content);
                //这里可以加一个节流？
                newMarkParse(divRef.current, content);
              }}
            ></textarea>
          </div>

          {/* 用以改变两边宽度大小 */}
          <div
            draggable="false"
            className="absolute left-[50%] translate-x-[-100%] w-2 h-[100vh] cursor-ew-resize will-change-transform before:content-[''] before:block before:w-full before:h-full before:bg-slate-500/50 before:mx-0 before:my-auto"
            onMouseDown={handleMouseDown}
          >
            <div className="flex rounded-full w-[30px] h-[30px] absolute bg-orange-300/75 left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%] text-sm select-none font-bold text-center items-center">
              <span className="flex-1 text-green-500">&lt;</span>
              <span className="flex-1 text-blue-500">&gt;</span>
            </div>
          </div>
          {/* 效果展示区域 */}
          {/**/}
          <div
            ref={showRef}
            className="w-[50%] p-[20px] text-[20px] h-[100vh] box-border border-[2px] border-dashed  rounded"
          >
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
