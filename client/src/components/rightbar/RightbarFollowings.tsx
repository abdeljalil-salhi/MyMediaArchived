import { FC } from "react";
import { Link } from "react-router-dom";

import { PU, TRANSPARENT } from "../../globals";

interface RightbarFollowingsProps {
  profile: any;
}

export const RightbarFollowings: FC<RightbarFollowingsProps> = ({
  profile,
}) => {
  return (
    <>
      {profile.followingObj.map((u: any, i: any) => (
        <Link
          key={i}
          to={`/u/${u.username}`}
          state={{ user: u }}
          draggable={false}
        >
          <div className="rightbarFollowing">
            <img
              src={
                u.profile ? `${PU}${u.profile}` : TRANSPARENT
              }
              alt={u.username && u.username}
              className="rightbarFollowingImage skeleton"
              draggable={false}
            />
            <span className="rightbarFollowingName noneStyle">
              {u.fullName ? (
                u.fullName
              ) : (
                <div className="skeleton skeleton-text"></div>
              )}
            </span>
          </div>
        </Link>
      ))}
    </>
  );
};
