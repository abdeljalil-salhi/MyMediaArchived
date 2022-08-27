import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { KeyboardArrowLeftRounded } from "@mui/icons-material";

import NotFound from "../svgs/NotFound";
import { Topbar } from "../components/topbar/Topbar";

interface NotFound404Props {}

export const NotFound404: FC<NotFound404Props> = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "MyMedia - Page Not Found";
  }, []);

  return (
    <>
      <Topbar />
      <div className="notFoundContainer">
        <NotFound />
        <span className="notFoundGoBack" onClick={() => navigate(-1)}>
          <KeyboardArrowLeftRounded />
          Go back
        </span>
      </div>
    </>
  );
};
