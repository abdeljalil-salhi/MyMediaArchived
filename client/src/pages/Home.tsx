import { FC } from "react";
import { Helmet } from "react-helmet";

interface HomeProps {}

export const Home: FC<HomeProps> = () => {
  return (
    <>
      <Helmet>
        <title>MyMedia</title>
      </Helmet>
      homepage
    </>
  );
};
