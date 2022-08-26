import { FC, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Chat,
  Group,
  PlayCircleRounded,
  RssFeed,
  StoreRounded,
} from "@mui/icons-material";

import { PU } from "../../globals";
import { AuthContext } from "../../context/auth.context";
import { CloseFriend } from "../closeFriend/CloseFriend";

interface SidebarProps {}

export const Sidebar: FC<SidebarProps> = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  return (
    <div className="sidebarContainer">
      <div className="sidebarWrapper">
        <div className="sidebarItems">
          <Link
            to={`/u/${user.username}`}
            state={{ user }}
            draggable={false}
          >
            <div className={`sidebarItem noneStyle`}>
              <img
                src={
                  user.profile
                    ? `${PU}${user.profile}`
                    : `${PU}profile/noAvatar.png`
                }
                className="avatar"
                alt={user.fullName && user.fullName}
                draggable={false}
              />
              <span className="sidebarItemText sidebarProfileContainer">
                <span>
                  {user.fullName ? (
                    user.fullName
                  ) : (
                    <div className="skeleton skeleton-text"></div>
                  )}
                </span>
                <small>
                  {user.username ? (
                    `@${user.username}`
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
          {user.closeObj.map((u: any, i: any) => (
            <CloseFriend key={i} user={u} />
          ))}
        </div>
      </div>
    </div>
  );
};
