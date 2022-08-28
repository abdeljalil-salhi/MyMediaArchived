import { FC, useContext, useEffect, useState } from "react";
import { Button } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

import { isEmpty } from "../../utils/isEmpty";
import { AuthContext } from "../../context/auth.context";

interface FollowHandlerProps {
  idToFollow: string;
  type?: string;
}

export const FollowHandler: FC<FollowHandlerProps> = ({ idToFollow, type }) => {
  const [isFollowed, setIsFollowed] = useState<Boolean>(false);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!isEmpty(user.following)) {
      if (user.following.some((u: any) => u._id === idToFollow))
        setIsFollowed(true);
      else setIsFollowed(false);
    }
  }, [idToFollow, user.following]);

  const handleFollow = () => {};

  const handleUnfollow = () => {};

  return (
    <>
      {isFollowed && (
        <>
          {type === "profile" && (
            <Button className="rightbarFollowButton" onClick={handleUnfollow}>
              <Remove /> Unfollow
            </Button>
          )}
        </>
      )}
      {isFollowed === false && (
        <>
          {type === "profile" && (
            <Button className="rightbarFollowButton" onClick={handleFollow}>
              <Add /> Follow
            </Button>
          )}
        </>
      )}
    </>
  );
};
