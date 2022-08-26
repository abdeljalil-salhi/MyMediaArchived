import { FC, useContext } from "react";

import { AuthContext } from "../../context/auth.context";
import { NewPost } from "../newPost/NewPost";
import { HomeFeed } from "./HomeFeed";
import { ProfileFeed } from "./ProfileFeed";

interface FeedProps {
  userId?: any;
}

export const Feed: FC<FeedProps> = ({ userId }) => {
  const { user } = useContext(AuthContext);

  return (
    <div className="feedContainer">
      <div className="feedWrapper">
        {(!userId || userId === user._id) && <NewPost />}
        {userId ? <ProfileFeed /> : <HomeFeed />}
      </div>
    </div>
  );
};
