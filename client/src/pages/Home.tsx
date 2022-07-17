import { FC, useEffect } from "react";
import { Topbar } from "../components/topbar/Topbar";

interface HomeProps {}

export const Home: FC<HomeProps> = () => {
  useEffect(() => {
    document.title = "MyMedia";
  });

  return (
    <>
      <Topbar />
      <div>homepage</div>
    </>
  );
};
