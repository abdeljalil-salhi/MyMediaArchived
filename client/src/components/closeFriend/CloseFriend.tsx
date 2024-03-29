import { FC } from "react";
import { Link } from "react-router-dom";

import { PU, TRANSPARENT } from "../../globals";

interface CloseFriendProps {
  user: any;
}

export const CloseFriend: FC<CloseFriendProps> = ({ user }) => {
  // Close friend component for the close friend page of the app.
  // Displays the user's name and profile picture
  // Clicking on the user will take you to their profile page
  //
  // Props:
  // user: the user to display

  return (
    <Link to={user ? `/u/${user.username}` : ""} draggable={false}>
      <div className="closeFriendContainer">
        <img
          src={user.profile ? `${PU}${user.profile}` : TRANSPARENT}
          alt={user ? user.username : ""}
          className="closeFriendImage avatar skeleton"
          draggable={false}
        />
        <span className="closeFriendName noneStyle">
          {!user.fullName ? (
            <div className="skeleton skeleton-text"></div>
          ) : (
            user.fullName
          )}
        </span>
      </div>
    </Link>
  );
};
