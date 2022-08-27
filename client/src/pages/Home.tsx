import { FC, useEffect } from "react";

import { Topbar } from "../components/topbar/Topbar";
import { Sidebar } from "../components/sidebar/Sidebar";
import { Feed } from "../components/feed/Feed";
import { Rightbar } from "../components/rightbar/Rightbar";

interface HomeProps {}

export const Home: FC<HomeProps> = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    document.title = "MyMedia";
  }, []);

  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <Feed />
        <Rightbar />
      </div>
    </>
  );
};
