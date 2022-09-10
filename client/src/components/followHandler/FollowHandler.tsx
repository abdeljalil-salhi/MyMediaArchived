import { FC, useContext, useEffect, useState } from "react";
import { Button } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { createSelector } from "@reduxjs/toolkit";
import { Dispatch } from "redux";

import { isEmpty } from "../../utils/isEmpty";
import { AuthContext } from "../../context/auth.context";
import { makeSelectProfile } from "../../store/selectors/profileSelector";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  FollowUserVariables,
  FollowUser_followUser,
} from "../../generated/types/FollowUser";
import {
  UnfollowUserVariables,
  UnfollowUser_unfollowUser,
} from "../../generated/types/UnfollowUser";
import profileService from "../../store/services/profileService";
import { setProfile } from "../../store/slices/profileSlice";
import { TProfile } from "../../store/types/profileTypes";

interface FollowHandlerProps {
  idToFollow: string;
  type?: string;
}

const stateSelector = createSelector(makeSelectProfile, (profile) => ({
  profile: profile?.user,
}));

const actionDispatch = (dispatch: Dispatch) => ({
  setProfile: (profile: TProfile) => dispatch(setProfile(profile)),
});

export const FollowHandler: FC<FollowHandlerProps> = ({ idToFollow, type }) => {
  // the FollowHandler component is used to follow or unfollow a user
  //
  // Props:
  // idToFollow: the ID of the user to follow or unfollow
  // type: the type of button to display
  //   - "profile": the button is being displayed in the profile page
  //   - "username": the button is being displayed next to the username of the user

  const [isFollowed, setIsFollowed] = useState<Boolean>(false);

  // The states below are used by the followUser() GraphQL mutation
  const [followUserLoading, setFollowUserLoading] = useState<boolean>(false);
  const [followUserError, setFollowUserError] = useState<boolean>(false);

  // The states below are used by the unfollowUser() GraphQL mutation
  const [unfollowUserLoading, setUnfollowUserLoading] =
    useState<boolean>(false);
  const [unfollowUserError, setUnfollowUserError] = useState<boolean>(false);

  // The selector to get user informations from the context (ContextAPI)
  const { user } = useContext(AuthContext);

  // The selector to get state informations from the store (Redux)
  const { profile } = useAppSelector(stateSelector);

  // The dispatch function to update the profile state in the store (Redux)
  const { setProfile } = actionDispatch(useAppDispatch());

  /*
   * @example
   * const [followUserMutation, { data, loading, error }] = useFollowUserMutation({
   *   variables: {
   *      userId: // value for 'userId'
   *      userIdToFollow: // value for 'userIdToFollow'
   *   },
   * });
   */
  // const [followUser] = useFollowUserMutation();

  /*
   * @example
   * const [unfollowUserMutation, { data, loading, error }] = useUnfollowUserMutation({
   *   variables: {
   *      userId: // value for 'userId'
   *      userIdToUnfollow: // value for 'userIdToUnfollow'
   *   },
   * });
   */
  // const [unfollowUser] = useUnfollowUserMutation();

  // If the user is followed, set the isFollowed state to true
  // Otherwise, set the isFollowed state to false
  useEffect(() => {
    if (
      profile &&
      profile.followingObj &&
      profile.followingObj.some((u: any) => u._id === idToFollow)
    )
      setIsFollowed(true);
    else setIsFollowed(false);
  }, [idToFollow, profile]);

  const handleFollow = async () => {
    // Start the following process by turning the loading state to true
    setFollowUserLoading(true);
    // Prepare the variables to be sent in the GraphQL mutation
    const variables: FollowUserVariables = {
      userId: user._id,
      userIdToFollow: idToFollow,
    };
    try {
      // Send the GraphQL updating request to the server to follow the user
      const res: FollowUser_followUser = (await profileService
        .followUser(variables, user.accessToken)
        .catch((_: unknown) =>
          setFollowUserError(true)
        )) as FollowUser_followUser;

      if (!isEmpty(res.user)) {
        // If the request was successful, update the user's followings in the redux reducer
        setProfile(res);
      }
    } catch (_: unknown) {
      // Handle unknown errors and set the error state to true
      setFollowUserError(true);
    }
    // End the following process by turning the loading state to false
    setFollowUserLoading(false);
  };

  const handleUnfollow = async () => {
    // Start the unfollowing process by turning the loading state to true
    setUnfollowUserLoading(true);
    // Prepare the variables to be sent in the GraphQL mutation
    const variables: UnfollowUserVariables = {
      userId: user._id,
      userIdToUnfollow: idToFollow,
    };
    try {
      // Send the GraphQL updating request to the server to unfollow the user
      const res: UnfollowUser_unfollowUser = (await profileService
        .unfollowUser(variables, user.accessToken)
        .catch((_: unknown) =>
          setFollowUserError(true)
        )) as UnfollowUser_unfollowUser;

      if (!isEmpty(res.user)) {
        // If the request was successful, update the user's followings in the redux reducer
        setProfile(res);
      }
    } catch (_: unknown) {
      // Handle unknown errors and set the error state to true
      setUnfollowUserError(true);
    }
    // End the following process by turning the loading state to false
    setUnfollowUserLoading(false);
  };

  return (
    <>
      {isFollowed && (
        <>
          {type === "profile" && (
            <Button className="rightbarFollowButton" onClick={handleUnfollow}>
              <Remove /> Unfollow
            </Button>
          )}
        </>
      )}
      {!isFollowed && (
        <>
          {type === "profile" && (
            <Button className="rightbarFollowButton" onClick={handleFollow}>
              <Add /> Follow
            </Button>
          )}
        </>
      )}
    </>
  );
};
