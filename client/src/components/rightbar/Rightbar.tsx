import { FC } from "react";

import { HomeRightbar } from "./HomeRightbar";
import { ProfileRightbar } from "./ProfileRightbar";

interface RightbarProps {
  profile?: any;
  isProfile?: boolean;
}

export const Rightbar: FC<RightbarProps> = ({ profile, isProfile }) => {
  return (
    <div className="rightbarContainer">
      <div className="rightbarWrapper">
        {isProfile ? <ProfileRightbar profile={profile} /> : <HomeRightbar />}
      </div>
    </div>
  );
};
