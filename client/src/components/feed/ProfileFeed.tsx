import { FC, useContext, useEffect, useState } from "react";
import { createSelector } from "@reduxjs/toolkit";
import { Dispatch } from "redux";

import { AuthContext } from "../../context/auth.context";
import { LoadingBox } from "../loadingBox/LoadingBox";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  GetUserPostsVariables,
  GetUserPosts_getUserPosts,
  GetUserPosts_getUserPosts_errors,
  GetUserPosts_getUserPosts_posts,
} from "../../generated/types/GetUserPosts";
import postsService from "../../store/services/postsService";
import { isEmpty } from "../../utils/isEmpty";
import { makeSelectProfilePosts } from "../../store/selectors/profilePostsSelector";
import { setProfilePosts } from "../../store/slices/profilePostsSlice";
import {
  IProfilePostsState,
  TProfilePosts,
} from "../../store/types/profilePostsTypes";
import { makeSelectNewPosts } from "../../store/selectors/newPostsSelector";
import { INewPostsState } from "../../store/types/newPostsTypes";
import { DisplayPosts } from "./DisplayPosts";

interface ProfileFeedProps {
  userId: string;
  states: {
    firstQuery: boolean;
    setFirstQuery: React.Dispatch<React.SetStateAction<boolean>>;
    loadPosts: boolean;
    setLoadPosts: React.Dispatch<React.SetStateAction<boolean>>;
  };
}

const profilePostsStateSelector = createSelector(
  makeSelectProfilePosts,
  (profilePosts: IProfilePostsState["data"]) => ({
    profilePosts,
  })
);

const newPostsStateSelector = createSelector(
  makeSelectNewPosts,
  (newPosts: INewPostsState["data"]) => ({
    newPosts,
  })
);

const actionDispatch = (dispatch: Dispatch) => ({
  setProfilePosts: (posts: TProfilePosts) => dispatch(setProfilePosts(posts)),
});

export const ProfileFeed: FC<ProfileFeedProps> = ({ userId, states }) => {
  // the ProfileFeed component is used to display the feed for the profile page
  //
  // Props:
  // userId: the ID of the user whose feed is to be displayed (defaults to the current logged in user)
  //
  // Notes:
  // - The feed is displayed as a list of posts sorted by date (newest first)
  // - The feed is displayed for the user with the given ID (profile page)
  // - The feed is paginated with 15 posts per load (default)
  // - The feed is loaded with the next 15 posts when the user clicks the "Load more" button
  // - The feed is not displayed if the user was not found

  // The states below are used by the getUserPosts() GraphQL query
  const [getUserPostsLoading, setGetUserPostsLoading] =
    useState<boolean>(false);
  const [getUserPostsError, setGetUserPostsError] = useState<boolean>(false);

  // The selector to get user informations from the context (ContextAPI)
  const { user } = useContext(AuthContext);

  // The selector to get state informations from the store (Redux)
  const { profilePosts } = useAppSelector(profilePostsStateSelector);
  const { newPosts } = useAppSelector(newPostsStateSelector);

  // The dispatch function to update the posts state in the store (Redux)
  const { setProfilePosts } = actionDispatch(useAppDispatch());

  /*
   * @example
   * const { data, loading, error } = useGetUserPostsQuery({
   *   variables: {
   *      userId: // value for 'userId'
   *      limit: // value for 'limit'
   *      cursor: // value for 'cursor'
   *   },
   * });
   */

  useEffect(() => {
    const fetchPosts = async () => {
      // Start the querying process by turning the loading state to true
      setGetUserPostsLoading(true);
      // Prepare the variables to be sent in the GraphQL query
      const variables: GetUserPostsVariables = {
        userId,
        limit: 10,
        cursor: states.firstQuery
          ? null
          : profilePosts &&
            profilePosts.posts &&
            profilePosts.posts[profilePosts.posts.length - 1].createdAt,
      };
      try {
        // Send the GraphQL getUserPosts request to the server
        const res: GetUserPosts_getUserPosts = (await postsService
          .getUserPosts(variables, user.accessToken)
          .catch((_: unknown) =>
            setGetUserPostsLoading(false)
          )) as GetUserPosts_getUserPosts;

        // If the request is successful, update the state with the response data
        if (!isEmpty(res.posts)) {
          setProfilePosts(
            states.firstQuery
              ? res
              : {
                  __typename: "PaginatedPostsResponse",
                  errors: res.errors,
                  posts: [
                    ...((profilePosts as GetUserPosts_getUserPosts)
                      .posts as GetUserPosts_getUserPosts_posts[]),
                    ...((res as GetUserPosts_getUserPosts)
                      .posts as GetUserPosts_getUserPosts_posts[]),
                  ],
                  hasMore: res.hasMore,
                }
          );
          states.firstQuery && states.setFirstQuery(false);
        } else if (!isEmpty(res.errors)) {
          // If the request is not successful, update the state with the response errors
          setGetUserPostsError(true);
        }
      } catch (_: unknown) {
        // If an error occurs, turn the error state to true
        setGetUserPostsError(true);
      }
      // End the querying process by turning the loading state to false
      setGetUserPostsLoading(false);
      states.setLoadPosts(false);
    };
    if (states.loadPosts)
      if ((profilePosts as GetUserPosts_getUserPosts).hasMore) fetchPosts();

    const loadMore = () => {
      // Checks if the user is at the bottom of the page
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >
          document.scrollingElement!.scrollHeight &&
        !states.loadPosts
      )
        states.setLoadPosts(true);
    };

    // Add the event listener when the user is scrolling
    window.addEventListener("scroll", loadMore);

    // Remove the event listener when the user stops scrolling
    return () => window.removeEventListener("scroll", loadMore);
  }, [profilePosts, setProfilePosts, user, userId, states]);

  // If the query has no posts, display a message
  if (!getUserPostsLoading && !profilePosts)
    return (
      <>
        <h3>Sorry, there are no posts to show here.</h3>
      </>
    );

  // If an error occurred, display an error message
  if (!isEmpty((profilePosts as GetUserPosts_getUserPosts).errors))
    return (
      <p>
        {
          (
            (profilePosts as GetUserPosts_getUserPosts)
              .errors as GetUserPosts_getUserPosts_errors[]
          )[0].message
        }
      </p>
    );

  return (
    <>
      {userId === user._id && !isEmpty(newPosts) && (
        <DisplayPosts posts={newPosts!.posts!} reducer={"newPosts"} />
      )}
      {!isEmpty(profilePosts) && (
        <DisplayPosts posts={profilePosts!.posts!} reducer={"profilePosts"} />
      )}
      {getUserPostsLoading && (
        // If the query is loading, display a loading box
        <>
          <LoadingBox />
        </>
      )}
    </>
  );
};
