import {
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
import { Dispatch } from "redux";

import { PU, TRANSPARENT } from "../globals";
import { Sidebar } from "../components/sidebar/Sidebar";
import { useUpdateUserMutation } from "../generated/graphql";
import { isEmpty } from "../utils/isEmpty";
import { Rightbar } from "../components/rightbar/Rightbar";
import { AuthContext } from "../context/auth.context";
import { Feed } from "../components/feed/Feed";
import { Topbar } from "../components/topbar/Topbar";
import { GraphQLAccessToken } from "../utils/_graphql";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from "../context/actions/auth.actions";
import { updateLocalStorageUser } from "../utils/localStorage";
import getProfileService from "../store/services/getProfileService";
import {
  GetProfile_getProfile,
  GetProfile_getProfile_errors,
  GetProfile_getProfile_user,
} from "../generated/types/GetProfile";
import { setProfile } from "../store/slices/profileSlice";
import { useAppDispatch } from "../store/hooks";
import { IProfileState } from "../store/types/profileTypes";

interface ProfileProps {}

const actionDispatch = (dispatch: Dispatch) => ({
  setProfile: (profile: IProfileState) => dispatch(setProfile(profile)),
});

export const Profile: FC<ProfileProps> = () => {
  // the Profile page is used to display the user's profile

  const [updatingBio, setUpdatingBio] = useState<boolean>(false);
  const [getProfileData, setGetProfileData] = useState<GetProfile_getProfile>(
    {} as GetProfile_getProfile
  );
  const [getProfileLoading, setGetProfileLoading] = useState<boolean>(false);
  const [getProfileError, setGetProfileError] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<GetProfile_getProfile_user>(
    {} as GetProfile_getProfile_user
  );
  const [bio, setBio] = useState<string | null>(null);

  const timerRef: MutableRefObject<any> = useRef(null);
  const updateBioRef: MutableRefObject<HTMLTextAreaElement | null> =
    useRef<HTMLTextAreaElement | null>(null);

  const { user, dispatch } = useContext(AuthContext);

  const params: Readonly<Params<string>> = useParams();

  const { setProfile } = actionDispatch(useAppDispatch());

  const [updateUser] = useUpdateUserMutation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [params.username]);

  useEffect(() => {
    const fetchProfile = async () => {
      setGetProfileLoading(true);
      const res: GetProfile_getProfile = (await getProfileService
        .getProfile(params.username as string)
        .catch((_: unknown) =>
          setGetProfileError(true)
        )) as GetProfile_getProfile;
      setGetProfileData(res);
      setProfile(res as any);
      !isEmpty(res.user) &&
        setUserProfile(res.user as GetProfile_getProfile_user);
      setGetProfileLoading(false);
    };
    fetchProfile();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.username]);

  useEffect(() => {
    document.title = !isEmpty(userProfile.fullName)
      ? `${userProfile.fullName} - MyMedia`
      : "MyMedia";
  }, [userProfile]);

  useEffect(() => {
    const pageClickEvent = (e: any) => {
      if (
        !isEmpty(updateBioRef.current) &&
        !(updateBioRef.current as HTMLTextAreaElement).contains(e.target)
      )
        setUpdatingBio(!updatingBio);
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

  const handleUpdateBio = async () => {
    if (bio && bio.trim()) {
      // Start the updating process by dispatching the updateUserStart action
      dispatch(updateUserStart());
      try {
        // Send the GraphQL updating request to the server
        const res = await updateUser({
          variables: {
            userId: user._id,
            accessToken: user.accessToken,
            bio,
          },
          // Pass the access token to the GraphQL context
          context: GraphQLAccessToken(user.accessToken),
        });
        if (!isEmpty(res.data?.updateUser.user)) {
          // If the request was successful, dispatch the updateUserSuccess action
          dispatch(updateUserSuccess(res.data!.updateUser.user));
          updateLocalStorageUser(res.data?.updateUser.user);
          setUpdatingBio(false);
          setBio("");
          window.location.reload();
        } else if (!isEmpty(res.data?.updateUser.errors)) {
          // Handle known errors and show them to the user
          // TODO: Show the errors to the user
          //
          // @example
          // setError(res.data.login.errors[0].message as string);
          // setErrorOpened(true);
        } else if (!isEmpty(res.errors)) {
          // Handle unknown errors and show them to the user
          // TODO: Show the errors to the user
          //
          // @example
          // setError(
          //   `${
          //     res.errors[0].message as string
          //   }. Please report this error to the support.`
          // );
          // setErrorOpened(true);
        }
      } catch (err: unknown) {
        // Dispatch the updating failure by dispatching the updateUserFailure action
        dispatch(updateUserFailure());
      }
    } else {
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
