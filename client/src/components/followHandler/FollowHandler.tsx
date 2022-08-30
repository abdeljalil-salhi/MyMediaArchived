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
  // the FollowHandler component is used to follow or unfollow a user
  //
  // Props:
  // idToFollow: the ID of the user to follow or unfollow
  // type: the type of button to display
  //   - "profile": the button is being displayed in the profile page
  //   - "username": the button is being displayed next to the username of the user

  const [isFollowed, setIsFollowed] = useState<Boolean>(false);

  const { user } = useContext(AuthContext);

  // If the user is followed, set the isFollowed state to true
  // Otherwise, set the isFollowed state to false
  useEffect(() => {
    if (!isEmpty(user.followingObj)) {
      if (user.followingObj.some((u: any) => u._id === idToFollow))
        setIsFollowed(true);
      else setIsFollowed(false);
    }
  }, [idToFollow, user.followingObj]);

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
      {!isFollowed && (
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
