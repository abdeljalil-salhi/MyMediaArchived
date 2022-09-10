import { FC, useContext, useEffect, useState } from "react";
import { Button } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { createSelector } from "@reduxjs/toolkit";

import { AuthContext } from "../../context/auth.context";
import {
  useFollowUserMutation,
  useUnfollowUserMutation,
} from "../../generated/graphql";
import { GraphQLAccessToken } from "../../utils/_graphql";
import { makeSelectProfile } from "../../store/selectors/profileSelector";
import { useAppSelector } from "../../store/hooks";

interface FollowHandlerProps {
  idToFollow: string;
  type?: string;
}

const stateSelector = createSelector(makeSelectProfile, (profile) => ({
  profile: profile?.user,
}));

export const FollowHandler: FC<FollowHandlerProps> = ({ idToFollow, type }) => {
  // the FollowHandler component is used to follow or unfollow a user
  //
  // Props:
  // idToFollow: the ID of the user to follow or unfollow
  // type: the type of button to display
  //   - "profile": the button is being displayed in the profile page
  //   - "username": the button is being displayed next to the username of the user

  const [isFollowed, setIsFollowed] = useState<Boolean>(false);

  const { user } = useContext(AuthContext);

  const { profile } = useAppSelector(stateSelector);

  /*
   * @example
   * const [followUserMutation, { data, loading, error }] = useFollowUserMutation({
   *   variables: {
   *      userId: // value for 'userId'
   *      userIdToFollow: // value for 'userIdToFollow'
   *   },
   * });
   */
  const [followUser] = useFollowUserMutation();

  /*
   * @example
   * const [unfollowUserMutation, { data, loading, error }] = useUnfollowUserMutation({
   *   variables: {
   *      userId: // value for 'userId'
   *      userIdToUnfollow: // value for 'userIdToUnfollow'
   *   },
   * });
   */
  const [unfollowUser] = useUnfollowUserMutation();

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

  const handleFollow = () => {
    // Send the GraphQL updating request to the server to follow the user
    followUser({
      variables: {
        userId: user._id,
        userIdToFollow: idToFollow,
      },
      // Pass the access token to the GraphQL context
      context: GraphQLAccessToken(user.accessToken),
    });
    window.location.reload();
  };

  const handleUnfollow = () => {
    // Send the GraphQL updating request to the server to follow the user
    unfollowUser({
      variables: {
        userId: user._id,
        userIdToUnfollow: idToFollow,
      },
      // Pass the access token to the GraphQL context
      context: GraphQLAccessToken(user.accessToken),
    });
    window.location.reload();
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
