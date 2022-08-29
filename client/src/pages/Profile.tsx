import { FC, useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Twemoji } from "react-emoji-render";
import { format } from "timeago.js";
import { EditRounded } from "@mui/icons-material";
import { Button } from "@mui/material";

import { PU, TRANSPARENT } from "../globals";
import { Sidebar } from "../components/sidebar/Sidebar";
import {
  useGetProfileQuery,
  useUpdateUserMutation,
} from "../generated/graphql";
import { isEmpty } from "../utils/isEmpty";
import { Rightbar } from "../components/rightbar/Rightbar";
import { AuthContext } from "../context/auth.context";
import { Feed } from "../components/feed/Feed";
import { Topbar } from "../components/topbar/Topbar";
import { GraphQLAccessToken } from "../utils/_graphql";

interface ProfileProps {}

export const Profile: FC<ProfileProps> = () => {
  const [updatingBio, setUpdatingBio] = useState<Boolean>(false);
  const [userProfile, setUserProfile] = useState({} as any);
  const [bio, setBio] = useState(null as any);

  const timerRef: any = useRef(null as any);
  const updateBioRef: any = useRef<HTMLDivElement>(
    null as unknown as HTMLDivElement
  );

  const { user } = useContext(AuthContext);
  const params: any = useParams();

  const [updateUser] = useUpdateUserMutation();

  const { data, loading, error } = useGetProfileQuery({
    variables: {
      username: params.username as string,
    },
  });

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [params.username]);

  useEffect(() => {
    document.title = !isEmpty(data?.getProfile.user?.fullName)
      ? `${data?.getProfile?.user?.fullName} - MyMedia`
      : "MyMedia";
  }, [data]);

  useEffect(() => {
    !isEmpty(data?.getProfile.user) && setUserProfile(data?.getProfile.user);
  }, [data]);

  useEffect(() => {
    const pageClickEvent = (e: any) => {
      if (
        updateBioRef.current !== null &&
        !updateBioRef.current.contains(e.target)
      ) {
        setUpdatingBio(!updatingBio);
      }
    };

    if (updatingBio) {
      timerRef.current = setTimeout(
        () => window.addEventListener("click", pageClickEvent),
        100
      );
    }

    return () => window.removeEventListener("click", pageClickEvent);
  }, [updatingBio]);

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  const handleUpdateBio = () => {
    if (bio.trim()) {
      updateUser({
        variables: {
          userId: user._id,
          accessToken: user.accessToken,
          bio,
        },
        context: GraphQLAccessToken(user.accessToken),
      });
      setUpdatingBio(false);
      setBio(null as any);
      window.location.reload();
    } else {
      setUpdatingBio(false);
      setBio(null as any);
    }
  };

  if (!loading && !data) window.location.href = "/404?user=notfound";

  if (error) window.location.href = "/404?user=notfound";

  if (
    !isEmpty(data?.getProfile.errors) &&
    (data?.getProfile as any).errors[0].message === "User not found"
  )
    window.location.href = "/404?user=notfound";

  return (
    <>
      <Topbar />
      <div className="profileContainer">
        <Sidebar />
        <div className="profile">
          <div className="profileTop">
            <div className="profileCover">
              <img
                className="profileCoverImage skeleton"
                src={
                  userProfile.cover ? `${PU}${userProfile.cover}` : TRANSPARENT
                }
                alt={`${userProfile.firstName}'s cover`}
                draggable={false}
              />
              <img
                className="profileUserImage avatar skeleton"
                src={
                  userProfile.profile
                    ? `${PU}${userProfile.profile}`
                    : TRANSPARENT
                }
                alt={`${userProfile.firstName}'s profile`}
                draggable={false}
              />
            </div>
            <div className="profileInfo">
              <h1 className="profileInfoName">{userProfile.fullName}</h1>
              {userProfile._id !== user._id ? (
                user.followingObj.some(
                  (u: any) => u._id === userProfile._id
                ) ? (
                  <h5>online {format(userProfile.online)}</h5>
                ) : null
              ) : null}
              {!isEmpty(userProfile.bio) && (
                <>
                  {!updatingBio ? (
                    <>
                      <span className="profileInfoBio">
                        <Twemoji
                          text={userProfile.bio ? userProfile.bio : ""}
                          onlyEmojiClassName="makeEmojisLarge"
                        />
                      </span>
                      {params.username === user.username && (
                        <Button
                          className="profileInfoBioEdit"
                          onClick={() => setUpdatingBio(!updatingBio)}
                        >
                          <EditRounded />
                          Edit
                        </Button>
                      )}
                    </>
                  ) : (
                    <>
                      <textarea
                        className="profileInfoBioTextarea"
                        defaultValue={user.bio}
                        onChange={(e) => setBio(e.target.value)}
                        maxLength={100}
                        ref={updateBioRef}
                      ></textarea>
                      <div className="profileInfoBioTextareaCounter">
                        <span className="profileInfoBioTextareaMax">
                          {bio !== null ? bio.length : user.bio.length}/100
                        </span>
                        <Button
                          className="profileInfoBioTextareaButton"
                          onClick={handleUpdateBio}
                        >
                          Update
                        </Button>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="profileBottom">
            <Feed userId={userProfile._id} />
            <Rightbar isProfile profile={userProfile} />
          </div>
        </div>
      </div>
    </>
  );
};
