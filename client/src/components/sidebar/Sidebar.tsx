import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Chat,
  Group,
  PlayCircleRounded,
  RssFeed,
  StoreRounded,
} from "@mui/icons-material";
import { createSelector } from "@reduxjs/toolkit";

import { PU, TRANSPARENT } from "../../globals";
import { CloseFriend } from "../closeFriend/CloseFriend";
import { useAppSelector } from "../../store/hooks";
import { makeSelectProfile } from "../../store/selectors/profileSelector";

interface SidebarProps {}

const stateSelector = createSelector(makeSelectProfile, (profile) => ({
  profile: profile?.user,
}));

export const Sidebar: FC<SidebarProps> = () => {
  const location = useLocation();

  const { profile } = useAppSelector(stateSelector);

  return (
    <div className="sidebarContainer">
      <div className="sidebarWrapper">
        <div className="sidebarItems">
          <Link to={`/u/${profile && profile.username}`} draggable={false}>
            <div className={`sidebarItem noneStyle`}>
              <img
                src={
                  profile && profile.profile
                    ? `${PU}${profile.profile}`
                    : TRANSPARENT
                }
                className="avatar skeleton"
                alt={profile ? profile.fullName : ""}
                draggable={false}
              />
              <span className="sidebarItemText sidebarProfileContainer">
                <span>
                  {profile ? (
                    profile.fullName
                  ) : (
                    <div className="skeleton skeleton-text"></div>
                  )}
                </span>
                <small>
                  {profile ? (
                    `@${profile.username}`
                  ) : (
                    <div className="skeleton skeleton-text"></div>
                  )}
                </small>
              </span>
            </div>
          </Link>
          <Link to="/" draggable={false}>
            <div
              className={`sidebarItem noneStyle${
                location.pathname === "/" ? " sidebarItemActive" : ""
              }`}
            >
              <RssFeed />
              <div className="sidebarItemText">Feed</div>
            </div>
          </Link>
          <Link to="/direct" draggable={false}>
            <div
              className={`sidebarItem noneStyle${
                location.pathname === "/direct" ? "sidebarItemActive" : ""
              }`}
            >
              <Chat />
              <div className="sidebarItemText">Direct</div>
            </div>
          </Link>
          <Link to="/videos" draggable={false}>
            <div
              className={`sidebarItem noneStyle${
                location.pathname === "/videos" ? "sidebarItemActive" : ""
              }`}
            >
              <PlayCircleRounded />
              <div className="sidebarItemText">Videos</div>
            </div>
          </Link>
          <Link to="/groups" draggable={false}>
            <div
              className={`sidebarItem noneStyle${
                location.pathname === "/groups" ? "sidebarItemActive" : ""
              }`}
            >
              <Group />
              <div className="sidebarItemText">Groups</div>
            </div>
          </Link>
          <Link to="/marketplace" draggable={false}>
            <div
              className={`sidebarItem noneStyle${
                location.pathname === "/marketplace" ? "sidebarItemActive" : ""
              }`}
            >
              <StoreRounded />
              <div className="sidebarItemText">Marketplace</div>
            </div>
          </Link>
        </div>
        <div className="sidebarCloseFriends">
          <h4>Close Friends</h4>
          {profile &&
            profile.closeObj &&
            profile.closeObj.map((u: any, i: any) => (
              <CloseFriend key={i} user={u} />
            ))}
        </div>
      </div>
    </div>
  );
};
