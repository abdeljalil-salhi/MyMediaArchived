import { FC, useContext, useEffect, useState } from "react";
import { createSelector } from "@reduxjs/toolkit";

import { PC } from "../../globals";
import { SocketContext } from "../../context/socket.context";
import { OnlineFriend } from "../onlineFriend/OnlineFriend";
import { RightbarSuggestions } from "./RightbarSuggestions";
import { SocketUser } from "../../context/types/socket.types";
import { useAppSelector } from "../../store/hooks";
import { makeSelectProfile } from "../../store/selectors/profileSelector";
import { IProfileState } from "../../store/types/profileTypes";
import { GetProfile_getProfile_user_followingObj } from "../../generated/types/GetProfile";
import { isEmpty } from "../../utils/isEmpty";

interface HomeRightbarProps {}

const profileStateSelector = createSelector(
  makeSelectProfile,
  (profile: IProfileState["data"]) => ({
    profile: profile.user,
  })
);

export const HomeRightbar: FC<HomeRightbarProps> = () => {
  const [onlineUsers, setOnlineUsers] = useState<any[]>([]);

  // The selector to get the online users from the context (ContextAPI)
  const { users } = useContext(SocketContext);

  // The selector to get state informations from the store (Redux)
  const { profile } = useAppSelector(profileStateSelector);

  useEffect(() => {
    if (!isEmpty(users) && profile)
      setOnlineUsers(
        profile.followingObj!.filter(
          (f: GetProfile_getProfile_user_followingObj) =>
            users.some((u: SocketUser) => u.userId === f._id)
        )
      );
  }, [profile, users]);

  return (
    <>
      <div className="rightbarBirthdays">
        <img
          src={`${PC}assets/images/gift.png`}
          alt="Birthday gift"
          className="rightbarBirthdayImage"
          draggable={false}
        />
        <span className="rightbarBirthdayText">
          <b>Abdeljalil</b> and <b>2 other friends</b> have a birthday today.
        </span>
      </div>
      <RightbarSuggestions profile={profile} />
      <div className="rightbarOnline">
        <h4 className="rightbarOnlineTitle">Online Friends</h4>
        <div className="rightbarOnlineList">
          {onlineUsers?.map((u, i) => (
            <OnlineFriend key={i} user={u} />
          ))}
        </div>
      </div>
    </>
  );
};
