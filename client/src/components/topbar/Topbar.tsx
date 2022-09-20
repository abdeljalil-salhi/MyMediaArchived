import {
  FC,
  MutableRefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Link } from "react-router-dom";
import {
  BugReport,
  Chat,
  ExpandMore,
  HomeRounded,
  MeetingRoom,
  Notifications,
  Person,
  Search,
  Settings,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { createSelector } from "@reduxjs/toolkit";

import { GEO, IP_API, PC, PU, TRANSPARENT, USER } from "../../globals";
import { AuthContext } from "../../context/auth.context";
import { logout as logOut } from "../../context/actions/auth.actions";
import { isEmpty } from "../../utils/isEmpty";
import { makeSelectProfile } from "../../store/selectors/profileSelector";
import { useAppSelector } from "../../store/hooks";
import { IProfileState } from "../../store/types/profileTypes";

interface TopbarProps {}

const profileStateSelector = createSelector(
  makeSelectProfile,
  (profile: IProfileState["data"]) => ({
    profile: profile.user,
  })
);

export const Topbar: FC<TopbarProps> = () => {
  const [dropdown, setDropdown] = useState<boolean>(false);

  const timerRef: MutableRefObject<any> = useRef(null);
  const dropdownRef: MutableRefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement | null>(null);

  const { dispatch } = useContext(AuthContext);

  // The selector to get state informations from the store (Redux)
  const { profile } = useAppSelector(profileStateSelector);

  useEffect(() => {
    if (isEmpty(localStorage.getItem("localGeo"))) {
      const endpoint = IP_API;
      let xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
          let response = JSON.parse(this.responseText);
          if (response.status !== "success") {
            return;
          }
          localStorage.setItem(GEO, this.responseText);
        }
      };
      xhr.open("GET", endpoint, true);
      xhr.send();
    }
  }, []);

  useEffect(() => {
    const pageClickEvent = (e: any) => {
      if (
        !isEmpty(dropdownRef.current) &&
        !(dropdownRef.current as HTMLDivElement).contains(e.target)
      )
        setDropdown(!dropdown);
    };

    if (dropdown) {
      timerRef.current = setTimeout(
        () => window.addEventListener("click", pageClickEvent),
        100
      );
    }

    return () => window.removeEventListener("click", pageClickEvent);
  }, [dropdown]);

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  const logout = () => {
    localStorage.removeItem(USER);
    dispatch(logOut());
    if (window.location.href !== "/") window.location.href = "/";
  };

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/">
          <span className="topbarLogo">
            <img
              src={`${PC}assets/images/icon.png`}
              alt="MyMedia Logo"
              draggable={false}
            />
            <h1>MyMedia</h1>
          </span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="topbarSearchbar">
          <Search />
          <input
            type="text"
            placeholder="Search Profile"
            className="topbarSearchbarInput"
            autoComplete="off"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <Link to="/" draggable={false}>
            <span className="topbarLink noneStyle">
              <IconButton>
                <HomeRounded />
              </IconButton>
            </span>
          </Link>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <IconButton>
              <Person />
              <span className="topbarIconBadge">99</span>
            </IconButton>
          </div>
          <div className="topbarIconItem">
            <Link to="/direct" draggable={false}>
              <IconButton>
                <Chat className="noneStyle" />
                <span className="topbarIconBadge">2</span>
              </IconButton>
            </Link>
          </div>
          <div className="topbarIconItem">
            <IconButton>
              <Notifications />
              <span className="topbarIconBadge">1</span>
            </IconButton>
          </div>
        </div>
        <div className="topbarProfileDiv">
          <Link to={profile ? `/u/${profile.username}` : ""} draggable={false}>
            <img
              src={
                profile && profile.profile
                  ? `${PU}${profile.profile}`
                  : TRANSPARENT
              }
              alt={profile ? profile.fullName : ""}
              className="topbarImage avatar skeleton"
              draggable={false}
            />
          </Link>
          <span>
            <IconButton onClick={() => setDropdown(!dropdown)}>
              <ExpandMore />
            </IconButton>
            {dropdown && (
              <div className="topbarProfileDivDropdown" ref={dropdownRef}>
                <div className="topbarProfileDivDropdownItem">
                  <Settings />
                  <div>Settings</div>
                </div>
                <div className="topbarProfileDivDropdownItem">
                  <BugReport />
                  <div>Report bug</div>
                </div>
                <div className="topbarProfileDivDropdownItem" onClick={logout}>
                  <MeetingRoom />
                  <div>Log Out</div>
                </div>
              </div>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};
