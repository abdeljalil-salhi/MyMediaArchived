import { FC, useContext } from "react";

import { AuthContext } from "../../context/auth.context";
import { NewPost } from "../newPost/NewPost";
import { HomeFeed } from "./HomeFeed";
import { ProfileFeed } from "./ProfileFeed";

interface FeedProps {
  userId?: any;
}

export const Feed: FC<FeedProps> = ({ userId }) => {
  // the Feed component is used to display the feed for the home page and the profile page
  //
  // Props:
  // userId: the ID of the user whose feed is to be displayed (defaults to the current logged in user)
  // notFound: a boolean indicating whether the user was not found
  //
  // Notes:
  // - The feed is displayed as a list of posts sorted by date (newest first)
  // - If the feed is for the current logged in user, the user can create a new post
  // - When userId prop is not provided, the feed is displayed for the current logged in user (home page)
  // - When userId prop is provided, the feed is displayed for the user with the given ID (profile page)

  const { user } = useContext(AuthContext);

  return (
    <div className="feedContainer">
      <div className="feedWrapper">
        {(!userId || userId === user._id) && <NewPost />}
        {userId ? <ProfileFeed userId={userId} /> : <HomeFeed />}
      </div>
    </div>
  );
};
