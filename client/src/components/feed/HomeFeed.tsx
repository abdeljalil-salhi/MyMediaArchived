import { FC, useContext, useEffect, useState } from "react";
import { createSelector } from "@reduxjs/toolkit";
import { Dispatch } from "redux";

import { AuthContext } from "../../context/auth.context";
import { LoadingBox } from "../loadingBox/LoadingBox";
import { Post } from "../post/Post";
import { makeSelectPosts } from "../../store/selectors/postsSelector";
import { setPosts } from "../../store/slices/postsSlice";
import { TPosts } from "../../store/types/postsTypes";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  GetTimelinePostsVariables,
  GetTimelinePosts_getTimelinePosts,
  GetTimelinePosts_getTimelinePosts_errors,
  GetTimelinePosts_getTimelinePosts_posts,
} from "../../generated/types/GetTimelinePosts";
import postsService from "../../store/services/postsService";
import { isEmpty } from "../../utils/isEmpty";

interface HomeFeedProps {}

const stateSelector = createSelector(makeSelectPosts, (posts) => ({
  posts,
}));

const actionDispatch = (dispatch: Dispatch) => ({
  setPosts: (posts: TPosts) => dispatch(setPosts(posts)),
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
  const { posts } = useAppSelector(stateSelector);

  // The dispatch function to update the posts state in the store (Redux)
  const { setPosts } = actionDispatch(useAppDispatch());

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
          : posts &&
            posts.posts &&
            posts.posts[posts.posts.length - 1].createdAt,
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
          setPosts(
            firstQuery
              ? res
              : {
                  __typename: "PaginatedPostsResponse",
                  errors: res.errors,
                  posts: [
                    ...((posts as GetTimelinePosts_getTimelinePosts)
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
      if ((posts as GetTimelinePosts_getTimelinePosts).hasMore) fetchPosts();

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
  }, [firstQuery, loadPosts, posts, setPosts, user]);

  // If the query has no posts, display a message
  if (!getTimelinePostsLoading && !posts)
    return (
      <>
        <h3>Sorry, there are no posts to show here.</h3>
      </>
    );

  // If an error occurred, display an error message
  if (!isEmpty((posts as GetTimelinePosts_getTimelinePosts).errors))
    return (
      <p>
        {
          (
            (posts as GetTimelinePosts_getTimelinePosts)
              .errors as GetTimelinePosts_getTimelinePosts_errors[]
          )[0].message
        }
      </p>
    );

  return (
    <>
      {/* If the query is loading, display a loading box */}
      {!isEmpty(posts) &&
        // If the query is loaded, display the posts sorted by date (newest first)
        [...(posts!.posts as GetTimelinePosts_getTimelinePosts_posts[])]
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
        <>
          <LoadingBox />
        </>
      )}
    </>
  );
};
