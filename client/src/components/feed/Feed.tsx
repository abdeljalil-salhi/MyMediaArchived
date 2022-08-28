import { FC, useContext } from "react";

import { AuthContext } from "../../context/auth.context";
import { NewPost } from "../newPost/NewPost";
import { HomeFeed } from "./HomeFeed";
import { ProfileFeed } from "./ProfileFeed";

interface FeedProps {
  userId?: any;
  notFound?: boolean;
}

export const Feed: FC<FeedProps> = ({ userId, notFound }) => {
  const { user } = useContext(AuthContext);

  if (notFound)
    return (
      <div className="feedContainer">
        <div className="feedWrapper">User not found</div>
      </div>
    );

  return (
    <div className="feedContainer">
      <div className="feedWrapper">
        {(!userId || userId === user._id) && <NewPost />}
        {userId ? <ProfileFeed userId={userId} /> : <HomeFeed />}
      </div>
    </div>
  );
};
