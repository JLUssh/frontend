// import React from "react";

//
export default function Header() {
  return (
    <div className="mt-[60px]">
      <div className="w-full text-center text-[#444] flex flex-col items-center">
        <span className="roboto-black-italic block text-[20px] absolute top-[18%]">
          JLU & SSH
        </span>
        <span className="zcool-kuaile-regular block text-[80px]  absolute top-[20%]">
          个人 博客
        </span>
      </div>
      <img
        className="w-full object-cover h-[450px] mt-[80px]"
        src="https://images.pexels.com/photos/1167355/pexels-photo-1167355.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        alt=""
      />
    </div>
  );
}
