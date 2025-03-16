import "./index.css";
import { Mixin } from "./../../utils";
// 希望自定义一个弹框组件

const defaultBtnArr = [
  {
    content: "确认",
    handleClick: () => {},
  },
  {
    content: "取消",
    handleClick: () => {},
  },
];

export default function PopUpBox({ content, btnArr }) {
  for (let i = 0, len = btnArr.length; i < len; i++) {
    btnArr[i] = Mixin(defaultBtnArr[i], btnArr[i]);
  }

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 p-4 text-white rounded-sm z-[60]">
      <p className="mb-5">{content}</p>
      <div className="btn flex flex-1 gap-2 justify-end">
        {btnArr.map((item, idx) => (
          <button key={idx} onClick={item.handleClick}>
            {item.content}
          </button>
        ))}
      </div>
    </div>
  );
}
