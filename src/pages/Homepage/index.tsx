import Header from "@comp/Header";
import Posts from "@comp/Posts";
import SideBar from "@comp/SideBar";

import React, { useEffect } from "react";

import { getAllPosts } from "@/contacts";

export const loader = async () => {
  const data = await getAllPosts();
  return { data };
};

export default function Index() {
  // useEffect(() => {
  //     console.log('lskdfjsdkalf')
  //     window.scrollTo(0, 0);
  // });

  return (
    <>
      <Header />
      <div className="flex">
        <Posts></Posts>
        <SideBar></SideBar>
      </div>
    </>
  );
}
