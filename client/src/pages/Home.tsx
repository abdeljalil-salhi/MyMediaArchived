import { FC, useEffect } from "react";

interface HomeProps {}

export const Home: FC<HomeProps> = () => {
  useEffect(() => {
    document.title = "MyMedia";
  });

  return <>homepage</>;
};
