import { FC, useEffect } from "react";

import { Topbar } from "../components/topbar/Topbar";
import { Sidebar } from "../components/sidebar/Sidebar";
import { Feed } from "../components/feed/Feed";
import { Rightbar } from "../components/rightbar/Rightbar";

interface HomeProps {}

export const Home: FC<HomeProps> = () => {
  // The Home page is the main page of the application and it contains the Topbar, Sidebar, Feed and Rightbar components.
  //
  // Notes:
  // - The Home page is displayed when the user is logged in
  // - We scroll to the top of the document when the Home page is displayed

  // The useEffect() hook is used to scroll to the top of the document when the Home page is displayed
  // and change the title of the document to MyMedia
  useEffect(() => {
    document.title = "MyMedia";
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
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
