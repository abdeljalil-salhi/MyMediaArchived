import { FC } from "react";
import { Link } from "react-router-dom";

import { PU, TRANSPARENT } from "../../globals";

interface OnlineFriendProps {
  user: any;
}

export const OnlineFriend: FC<OnlineFriendProps> = ({ user }) => {
  // The OnlineFriend component is used to display a user's profile picture and name when they are online.
  //
  // Props:
  // user: the user to display
  //
  // Notes:
  // - The user's profile picture is displayed in a circle with a border and a green dot if they are online.

  return (
    <Link to={`/u/${user.username}`} state={{ user }} draggable={false}>
      <div className="onlineFriendContainer">
        <div className="onlineFriendProfile">
          <img
            src={user.profile ? `${PU}${user?.profile}` : TRANSPARENT}
            alt={user.username}
            className="onlineFriendImage avatar skeleton"
            draggable={false}
          />
          <span className="onlineFriendStatus"></span>
        </div>
        <div className="onlineFriendName noneStyle">{user.fullName}</div>
      </div>
    </Link>
  );
};
