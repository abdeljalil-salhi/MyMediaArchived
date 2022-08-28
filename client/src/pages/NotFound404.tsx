import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { KeyboardArrowLeftRounded, KeyboardArrowRightRounded } from "@mui/icons-material";

import NotFound from "../svgs/NotFound";
import { Topbar } from "../components/topbar/Topbar";
import { isEmpty } from "../utils/isEmpty";

interface NotFound404Props {}

export const NotFound404: FC<NotFound404Props> = () => {
  const [navigations, setNavigations] = useState<number>(1);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "MyMedia - Page Not Found";

    if (!isEmpty(new URLSearchParams(window.location.search).get("user")))
      setNavigations(2);
  }, []);

  return (
    <>
      <Topbar />
      <div className="notFoundContainer">
        <NotFound />
        <div className="notFoundText">
          <h1>Page Not Found</h1>
          <p>The page you are looking for does not exist or has been moved.</p>
        </div>
        <div className="notFoundNavigation">
        <span className="notFoundGoBack" onClick={() => navigate(-navigations)}>
          <KeyboardArrowLeftRounded />
          Go back
        </span>
        <span className="notFoundGoFeed" onClick={() => navigate("/")}>
          Go to Feed
          <KeyboardArrowRightRounded />
        </span>
        </div>
      </div>
    </>
  );
};
