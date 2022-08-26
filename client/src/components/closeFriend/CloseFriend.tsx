import { FC } from "react";
import { Link } from "react-router-dom";

import { PU } from "../../globals";

interface CloseFriendProps {
  user: any;
}

export const CloseFriend: FC<CloseFriendProps> = ({ user }) => {
  return (
    <Link to={`/u/${user.username}`} state={{ user }} draggable={false}>
      <div className="closeFriendContainer">
        <img
          src={
            user.profile ? `${PU}${user.profile}` : `${PU}profile/noAvatar.png`
          }
          alt={user.username}
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
