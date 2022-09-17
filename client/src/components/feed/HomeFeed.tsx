import { FC, useContext, useEffect, useState } from "react";
import { createSelector } from "@reduxjs/toolkit";
import { Dispatch } from "redux";

import { AuthContext } from "../../context/auth.context";
import { LoadingBox } from "../loadingBox/LoadingBox";
import { Post } from "../post/Post";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  GetTimelinePostsVariables,
  GetTimelinePosts_getTimelinePosts,
  GetTimelinePosts_getTimelinePosts_errors,
  GetTimelinePosts_getTimelinePosts_posts,
} from "../../generated/types/GetTimelinePosts";
import postsService from "../../store/services/postsService";
import { isEmpty } from "../../utils/isEmpty";
import { makeSelectHomePosts } from "../../store/selectors/homePostsSelector";
import { setHomePosts } from "../../store/slices/homePostsSlice";
import { IHomePostsState, THomePosts } from "../../store/types/homePostsTypes";
import { makeSelectNewPosts } from "../../store/selectors/newPostsSelector";
import { INewPostsState } from "../../store/types/newPostsTypes";

interface HomeFeedProps {}

const homePostsStateSelector = createSelector(
  makeSelectHomePosts,
  (homePosts: IHomePostsState["data"]) => ({
    homePosts,
  })
);

const newPostsStateSelector = createSelector(
  makeSelectNewPosts,
  (newPosts: INewPostsState["data"]) => ({
    newPosts,
  })
);

const actionDispatch = (dispatch: Dispatch) => ({
  setHomePosts: (posts: THomePosts) => dispatch(setHomePosts(posts)),
});

export const HomeFeed: FC<HomeFeedProps> = () => {
  // the HomeFeed component is used to display the feed for the home page
  //
  // Notes:
  // - The feed is displayed as a list of posts sorted by date (newest first)
  // - The feed is displayed for the current logged in user (home page)
  // - The feed is displayed as posts from followed users and from the current logged in user
  // - The feed is paginated with 15 posts per load (default)
  // - The feed is loaded with the next 15 posts when the user clicks the "Load more" button

  const [loadPosts, setLoadPosts] = useState<boolean>(true);
  const [firstQuery, setFirstQuery] = useState<boolean>(true);

  // The states below are used by the getTimelinePosts() GraphQL query
  const [getTimelinePostsLoading, setGetTimelinePostsLoading] =
    useState<boolean>(false);
  const [getTimelinePostsError, setGetTimelinePostsError] =
    useState<boolean>(false);

  // The selector to get user informations from the context (ContextAPI)
  const { user } = useContext(AuthContext);

  // The selector to get state informations from the store (Redux)
  const { homePosts } = useAppSelector(homePostsStateSelector);
  const { newPosts } = useAppSelector(newPostsStateSelector);

  // The dispatch function to update the posts state in the store (Redux)
  const { setHomePosts } = actionDispatch(useAppDispatch());

  /*
   * @example
   * const { data, loading, error } = useGetTimelinePostsQuery({
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
      setGetTimelinePostsLoading(true);
      // Prepare the variables to be sent in the GraphQL query
      const variables: GetTimelinePostsVariables = {
        userId: user._id,
        limit: 10,
        cursor: firstQuery
          ? null
          : homePosts &&
            homePosts.posts &&
            homePosts.posts[homePosts.posts.length - 1].createdAt,
      };
      try {
        // Send the GraphQL getTimelinePosts request to the server
        const res: GetTimelinePosts_getTimelinePosts = (await postsService
          .getTimelinePosts(variables, user.accessToken)
          .catch((_: unknown) =>
            setGetTimelinePostsLoading(false)
          )) as GetTimelinePosts_getTimelinePosts;

        // If the request is successful, update the state with the response data
        if (!isEmpty(res.posts)) {
          setHomePosts(
            firstQuery
              ? res
              : {
                  __typename: "PaginatedPostsResponse",
                  errors: res.errors,
                  posts: [
                    ...((homePosts as GetTimelinePosts_getTimelinePosts)
                      .posts as GetTimelinePosts_getTimelinePosts_posts[]),
                    ...((res as GetTimelinePosts_getTimelinePosts)
                      .posts as GetTimelinePosts_getTimelinePosts_posts[]),
                  ],
                  hasMore: res.hasMore,
                }
          );
          firstQuery && setFirstQuery(false);
        } else if (!isEmpty(res.errors)) {
          // If the request is not successful, update the state with the response errors
          setGetTimelinePostsError(true);
        }
      } catch (_: unknown) {
        // If an error occurs, turn the error state to true
        setGetTimelinePostsError(true);
      }
      // End the querying process by turning the loading state to false
      setGetTimelinePostsLoading(false);
      setLoadPosts(false);
    };
    if (loadPosts)
      if ((homePosts as GetTimelinePosts_getTimelinePosts).hasMore)
        fetchPosts();

    const loadMore = () => {
      // Checks if the user is at the bottom of the page
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >
          document.scrollingElement!.scrollHeight &&
        !loadPosts
      )
        setLoadPosts(true);
    };

    // Add the event listener when the user is scrolling
    window.addEventListener("scroll", loadMore);

    // Remove the event listener when the user stops scrolling
    return () => window.removeEventListener("scroll", loadMore);
  }, [firstQuery, loadPosts, homePosts, setHomePosts, user]);

  // If the query has no posts, display a message
  if (!getTimelinePostsLoading && !homePosts)
    return (
      <>
        <h3>Sorry, there are no posts to show here.</h3>
      </>
    );

  // If an error occurred, display an error message
  if (!isEmpty((homePosts as GetTimelinePosts_getTimelinePosts).errors))
    return (
      <p>
        {
          (
            (homePosts as GetTimelinePosts_getTimelinePosts)
              .errors as GetTimelinePosts_getTimelinePosts_errors[]
          )[0].message
        }
      </p>
    );

  return (
    <>
      {!isEmpty(homePosts) &&
        // If the query is loaded, display the posts sorted by date (newest first)
        [
          ...(homePosts!.posts as GetTimelinePosts_getTimelinePosts_posts[]),
          ...newPosts!.posts!,
        ]
          .sort(
            (
              p1: GetTimelinePosts_getTimelinePosts_posts,
              p2: GetTimelinePosts_getTimelinePosts_posts
            ) => {
              return (
                new Date(p2.createdAt).valueOf() -
                new Date(p1.createdAt).valueOf()
              );
            }
          )
          .map((post: GetTimelinePosts_getTimelinePosts_posts, index: number) =>
            !post ? null : <Post key={index} post={post} />
          )}
      {getTimelinePostsLoading && (
        // If the query is loading, display a loading box
        <>
          <LoadingBox />
        </>
      )}
    </>
  );
};
