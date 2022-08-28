import { FC, useContext, useState } from "react";
import { Chip } from "@mui/material";
import {
  HomeWorkRounded,
  FireplaceRounded,
  FavoriteRounded,
  Language,
  Instagram,
  Facebook,
  Twitter,
  Tag,
} from "@mui/icons-material";

import Snapchat from "../../svgs/Snapchat";
import { AuthContext } from "../../context/auth.context";
import { isEmpty } from "../../utils/isEmpty";
import { EditModal } from "./EditModal";
import { AstrologicalSign } from "../astrologicalSign/AstrologicalSign";
import { RightbarFollowings } from "./RightbarFollowings";
import { FollowHandler } from "../followHandler/FollowHandler";

interface ProfileRightbarProps {
  profile?: any;
}

export const ProfileRightbar: FC<ProfileRightbarProps> = ({ profile }) => {
  const [editModal, setEditModal] = useState<Boolean>(false);

  const { user } = useContext(AuthContext);

  const relationshipStatus = [
    "-",
    "Single",
    "In a relationship",
    "Engaged",
    "Married",
    "In an open relationship",
    "Separated",
    "Divorced",
    "Widowed",
    "It's complicated",
  ];

  if (profile)
    return (
      <>
        {!isEmpty(profile._id) && user._id !== profile._id && (
          <FollowHandler idToFollow={profile._id} type="profile" />
        )}
        <div className="rightbarSection">
          <div className="righbarSectionPadding">
            <h4 className="rightbarTitle">User Informations</h4>
            <div className="rightbarInfo">
              {!isEmpty(profile.city) && (
                <div className="rightbarInfoItem">
                  <span className="rightbarInfoItemKey">
                    <HomeWorkRounded />
                    Lives in
                  </span>
                  <div className="rightbarInfoItemValue">{profile.city}</div>
                </div>
              )}
              {!isEmpty(profile.hometown) && (
                <div className="rightbarInfoItem">
                  <span className="rightbarInfoItemKey">
                    <FireplaceRounded />
                    From
                  </span>
                  <span className="rightbarInfoItemValue">
                    {profile.hometown}
                  </span>
                </div>
              )}
              {!isEmpty(profile.relationship) && profile.relationship !== 0 && (
                <div className="rightbarInfoItem">
                  <span className="rightbarInfoItemKey ignoreMargins">
                    <FavoriteRounded />
                  </span>
                  <span className="rightbarInfoItemValue normalInfo">
                    {relationshipStatus[profile.relationship]}
                  </span>
                </div>
              )}
              {!isEmpty(profile.website) && (
                <div className="rightbarInfoItem">
                  <span className="rightbarInfoItemKey ignoreMargins">
                    <Language />
                  </span>
                  <span
                    className="rightbarInfoItemValue ignoreWeight linkStyle"
                    onClick={() => window.open(profile.website, "_blank")}
                  >
                    {profile.website.split("://")[1]}
                  </span>
                </div>
              )}
              {!isEmpty(profile.socials) &&
                profile.socials.map((social: string, i: any) => {
                  return (
                    <div className="rightbarInfoItem" key={i}>
                      <span className="rightbarInfoItemKey ignoreMargins">
                        {social.split(":")[0] === "instagram" ? (
                          <Instagram />
                        ) : social.split(":")[0] === "facebook" ? (
                          <Facebook />
                        ) : social.split(":")[0] === "twitter" ? (
                          <Twitter />
                        ) : social.split(":")[0] === "snapchat" ? (
                          <Snapchat />
                        ) : (
                          <Language />
                        )}
                      </span>
                      {social.split(":")[0] === "instagram" ||
                      social.split(":")[0] === "facebook" ||
                      social.split(":")[0] === "twitter" ? (
                        <span
                          className="rightbarInfoItemValue ignoreWeight linkStyle"
                          onClick={() =>
                            window.open(
                              `https://www.${social.split(":")[0]}.com/${
                                social.split(":")[1]
                              }/`,
                              "_blank"
                            )
                          }
                        >
                          {social.split(":")[1]}
                        </span>
                      ) : (
                        <span className="rightbarInfoItemValue normalInfo">
                          {social.split(":")[1]}
                        </span>
                      )}
                      {social.split(":")[0] === "instagram" ||
                      social.split(":")[0] === "facebook" ||
                      social.split(":")[0] === "twitter" ||
                      social.split(":")[0] === "snapchat" ? null : (
                        <span className="rightbarInfoItemComment">
                          {social.split(":")[0]}
                        </span>
                      )}
                    </div>
                  );
                })}
              {!isEmpty(profile.birthday) && (
                <AstrologicalSign date={profile.birthday} />
              )}
              {!isEmpty(profile.tags) && (
                <div className="rightbarInfoChips">
                  {profile.tags.map((tag: string, i: any) => {
                    return (
                      <Chip
                        key={i}
                        label={tag.split("#")}
                        size="small"
                        icon={<Tag />}
                        onClick={() => null}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          {user._id === profile._id && (
            <>
              <button
                className="rightbarInfoEdit"
                onClick={() => setEditModal(true)}
              >
                Edit Informations
              </button>
              <EditModal
                open={editModal as boolean}
                onClose={() => setEditModal(false)}
              />
            </>
          )}
        </div>
        {!isEmpty(profile.followingObj) && (
          <>
            <h4 className="rightbarTitle">User Followings</h4>
            <div className="rightbarFollowings">
              <RightbarFollowings profile={profile} />
            </div>
          </>
        )}
      </>
    );
  return null;
};
