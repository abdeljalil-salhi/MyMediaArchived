import {
  ChangeEvent,
  FC,
  MutableRefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Params, useParams } from "react-router-dom";
import { Twemoji } from "react-emoji-render";
import { format } from "timeago.js";
import { EditRounded } from "@mui/icons-material";
import { Button } from "@mui/material";
import { createSelector } from "@reduxjs/toolkit";
import { Dispatch } from "redux";

import { PU, TRANSPARENT } from "../globals";
import { Sidebar } from "../components/sidebar/Sidebar";
import { isEmpty } from "../utils/isEmpty";
import { Rightbar } from "../components/rightbar/Rightbar";
import { AuthContext } from "../context/auth.context";
import { Feed } from "../components/feed/Feed";
import { Topbar } from "../components/topbar/Topbar";
import { LoadingBox } from "../components/loadingBox/LoadingBox";
import { makeSelectProfile } from "../store/selectors/profileSelector";
import {
  GetProfile_getProfile_user,
  GetProfile_getProfile,
  GetProfile_getProfile_errors,
} from "../generated/types/GetProfile";
import {
  UpdateUserVariables,
  UpdateUser_updateUser,
  UpdateUser_updateUser_user,
} from "../generated/types/UpdateUser";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import profileService from "../store/services/profileService";
import { setProfile } from "../store/slices/profileSlice";
import { IProfileState, TProfile } from "../store/types/profileTypes";
import { clearProfilePosts } from "../store/slices/postsSlice";
import { SocketContext } from "../context/socket.context";
import { SocketUser } from "../context/types/socket.types";

interface ProfileProps {}

const profileStateSelector = createSelector(
  makeSelectProfile,
  (profile: IProfileState["data"]) => ({
    profile: profile.user,
  })
);

const actionDispatch = (dispatch: Dispatch) => ({
  setProfile: (profile: TProfile) => dispatch(setProfile(profile)),
  clearProfilePosts: () => dispatch(clearProfilePosts()),
});

export const Profile: FC<ProfileProps> = () => {
  // the Profile page is used to display the user's profile
  // and also to edit the user's profile informations
  //
  // Notes:
  // - the user can edit his profile informations only if he is the owner of the profile

  const [bio, setBio] = useState<string>("");
  const [updatingBio, setUpdatingBio] = useState<boolean>(false);
  const [firstQuery, setFirstQuery] = useState<boolean>(true);
  const [loadPosts, setLoadPosts] = useState<boolean>(true);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [userProfile, setUserProfile] = useState<GetProfile_getProfile_user>(
    {} as GetProfile_getProfile_user
  );

  // The states below are used by the getProfile() GraphQL query
  const [getProfileData, setGetProfileData] = useState<GetProfile_getProfile>(
    {} as GetProfile_getProfile
  );
  const [getProfileLoading, setGetProfileLoading] = useState<boolean>(false);
  const [getProfileError, setGetProfileError] = useState<boolean>(false);

  // The states below are used by the updateProfile() GraphQL mutation
  const [updateProfileLoading, setUpdateProfileLoading] =
    useState<boolean>(false);
  const [updateProfileError, setUpdateProfileError] = useState<boolean>(false);

  const timerRef: MutableRefObject<any> = useRef(null);
  const updateBioRef: MutableRefObject<HTMLTextAreaElement | null> =
    useRef<HTMLTextAreaElement | null>(null);

  // The selector to get the parameters from the URL
  const params: Readonly<Params<string>> = useParams();

  // The selector to get user informations from the context (ContextAPI)
  const { user } = useContext(AuthContext);
  // The selector to get the online users from the context (ContextAPI)
  const { users } = useContext(SocketContext);

  // The selector to get state informations from the store (Redux)
  const { profile } = useAppSelector(profileStateSelector);

  // The dispatch function to update the profile state in the store (Redux)
  const { setProfile, clearProfilePosts } = actionDispatch(useAppDispatch());

  // The useEffect hook below is used to scroll to the top of the page when the component is mounted
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [params.username]);

  // The useEffect hook below is used to get the user's online friends
  useEffect(() => {
    if (!isEmpty(users) && profile)
      setOnlineUsers(
        profile.following!.filter((followingId: string) =>
          users.some((u: SocketUser) => u.userId === followingId)
        )
      );
  }, [profile, users]);

  // The useEffect hook below is used to fetch the user's profile data
  useEffect(() => {
    const fetchProfile = async () => {
      // Start the querying process by turning the loading state to true
      setGetProfileLoading(true);
      try {
        // Send the GraphQL getProfile request to the server
        const res: GetProfile_getProfile = (await profileService
          .getProfile(params.username as string)
          .catch((_: unknown) =>
            setGetProfileError(true)
          )) as GetProfile_getProfile;
        if (!isEmpty(res.user)) {
          // If the request was successful, update the user's profile state
          setGetProfileData(res);
          setUserProfile(res.user as GetProfile_getProfile_user);
          params.username === user.username && setProfile(res);
          // Reset the posts state to the initial state when the user changes
          clearProfilePosts();
          setFirstQuery(true);
          setLoadPosts(true);
        } else if (!isEmpty(res.errors)) {
          // Redirect to the 404 page if the user's profile was not found
          setGetProfileError(true);
        }
      } catch (_: unknown) {
        // Redirect to the 404 page if the user's profile was not found
        setGetProfileError(true);
      }
      // End the updating process by turning the loading state to false
      setGetProfileLoading(false);
    };
    fetchProfile();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.username]);

  // The useEffect hook below is used to display the user's fullName in the document title
  useEffect(() => {
    document.title = !isEmpty(userProfile.fullName)
      ? `${userProfile.fullName} - MyMedia`
      : "MyMedia";
  }, [userProfile]);

  // The updating textarea is shown if the user clicks outside the textarea
  useEffect(() => {
    const pageClickEvent = (e: any) => {
      if (
        !isEmpty(updateBioRef.current) &&
        !(updateBioRef.current as HTMLTextAreaElement).contains(e.target)
      )
        setUpdatingBio(!updatingBio);
    };

    // Add the event listener when the textarea is shown
    if (updatingBio) {
      timerRef.current = setTimeout(
        () => window.addEventListener("click", pageClickEvent),
        100
      );
    }

    // Remove the event listener when the textarea is hidden
    return () => window.removeEventListener("click", pageClickEvent);
  }, [updatingBio]);

  // Clear the timer when the textarea is hidden to prevent memory leaks
  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  const handleUpdateBio = async () => {
    if (bio && bio.trim()) {
      // Start the updating process by turning the loading state to true
      setUpdateProfileLoading(true);
      // Prepare the variables to be sent in the GraphQL mutation
      const variables: UpdateUserVariables = {
        userId: user._id,
        accessToken: user.accessToken,
        bio,
      };
      try {
        // Send the GraphQL updating request to the server
        const res: UpdateUser_updateUser = (await profileService
          .updateProfile(variables)
          .catch((_: unknown) =>
            setUpdateProfileError(true)
          )) as UpdateUser_updateUser;

        if (!isEmpty(res.user)) {
          // If the request was successful, update the user's profile in the local storage
          setProfile(res);
          setUserProfile(res.user as UpdateUser_updateUser_user);
          setUpdatingBio(false);
          setBio("");
        } else if (!isEmpty(res.errors)) {
          // Handle known errors and show them to the user
          setUpdateProfileError(true);
          // TODO: Show the errors to the user
          //
          // @example
          // setError(res.data.login.errors[0].message as string);
          // setErrorOpened(true);
        }
      } catch (_: unknown) {
        // Handle unknown errors and show them to the user
        setUpdateProfileError(true);
      }
      // End the updating process by turning the loading state to false
      setUpdateProfileLoading(false);
    } else {
      // Handle empty bio by cancelling the updating process
      setUpdatingBio(false);
      setBio("");
    }
  };

  if (!getProfileLoading && !getProfileData)
    window.location.href = "/404?user=notfound";

  if (getProfileError) window.location.href = "/404?user=notfound";

  if (
    !isEmpty(getProfileData.errors) &&
    (getProfileData.errors as GetProfile_getProfile_errors[])[0].message ===
      "User not found"
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
              <div className="profileCoverWrapper">
                <img
                  className="profileCoverImage skeleton"
                  src={
                    userProfile.cover
                      ? `${PU}${userProfile.cover}`
                      : TRANSPARENT
                  }
                  alt={`${userProfile.firstName}'s cover`}
                  draggable={false}
                />
                <div className="profileCoverGradient"></div>
              </div>
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
              {userProfile._id !== user._id &&
                profile &&
                profile.following &&
                profile.following.includes(userProfile._id) &&
                onlineUsers.includes(userProfile._id) && (
                  <span className="onlineFriendStatus"></span>
                )}
            </div>
            <div className="profileInfo">
              <h1 className="profileInfoName">{userProfile.fullName}</h1>
              {userProfile._id !== user._id ? (
                profile &&
                profile.following &&
                profile.following.includes(userProfile._id) ? (
                  onlineUsers.includes(userProfile._id) ? (
                    <h5>online now</h5>
                  ) : (
                    <h5>online {format(userProfile.online)}</h5>
                  )
                ) : null
              ) : null}
              {!isEmpty(userProfile.bio) && (
                <>
                  {!updatingBio && !updateProfileLoading ? (
                    <>
                      <span className="profileInfoBio">
                        <Twemoji
                          text={
                            !isEmpty(userProfile.bio) ? userProfile.bio : ""
                          }
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
                  ) : updatingBio && !updateProfileLoading ? (
                    <>
                      <textarea
                        className="profileInfoBioTextarea"
                        defaultValue={userProfile.bio}
                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                          setBio(e.target.value)
                        }
                        maxLength={100}
                        ref={updateBioRef}
                      ></textarea>
                      <div className="profileInfoBioTextareaCounter">
                        <span className="profileInfoBioTextareaMax">
                          {isEmpty(bio) ? userProfile.bio.length : bio.length}
                          /100
                        </span>
                        <Button
                          className="profileInfoBioTextareaButton"
                          onClick={handleUpdateBio}
                        >
                          Update
                        </Button>
                      </div>
                    </>
                  ) : (
                    updateProfileLoading && <LoadingBox />
                  )}
                </>
              )}
            </div>
          </div>
          <div className="profileBottom">
            <Feed
              userId={userProfile._id}
              states={{ firstQuery, setFirstQuery, loadPosts, setLoadPosts }}
            />
            <Rightbar
              isProfile
              profile={userProfile._id === user._id ? profile : userProfile}
            />
          </div>
        </div>
      </div>
    </>
  );
};
