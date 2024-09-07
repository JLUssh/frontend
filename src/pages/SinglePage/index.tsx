import React, { useEffect } from "react";
import SinglePost from "@comp/SinglePost";
import SideBar from "@comp/SideBar";
export default function Index() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="w-full flex p-[20px]">
      <SinglePost />
      <SideBar />
    </div>
  );
}
