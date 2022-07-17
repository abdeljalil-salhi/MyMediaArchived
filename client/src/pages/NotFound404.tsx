import { FC } from "react";

import { Topbar } from "../components/topbar/Topbar";

interface NotFound404Props {}

export const NotFound404: FC<NotFound404Props> = () => {
  return (
    <>
      <Topbar />
      <h1>Error 404</h1>
      <h3>Not found !!</h3>
    </>
  );
};
