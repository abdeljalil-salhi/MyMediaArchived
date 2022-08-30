import { FC, useContext } from "react";
import { Button } from "@mui/material";

import { AuthContext } from "../../context/auth.context";
import { GraphQLAccessToken } from "../../utils/_graphql";
import { useGetUserPostsQuery } from "../../generated/graphql";
import { LoadingBox } from "../loadingBox/LoadingBox";
import { Post } from "../post/Post";

interface ProfileFeedProps {
  userId?: string;
}

export const ProfileFeed: FC<ProfileFeedProps> = ({ userId }) => {
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

  const { user } = useContext(AuthContext);

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
  const { data, loading, error, fetchMore, variables } = useGetUserPostsQuery({
    variables: {
      userId: userId as string,
      limit: 15,
      cursor: null as null | string,
    },
    notifyOnNetworkStatusChange: true,
    // Pass the access token to the GraphQL context
    context: GraphQLAccessToken(user.accessToken),
  });

  // If the query has no posts, display a message
  if (!loading && !data)
    return (
      <>
        <h3>Sorry, there are no posts to show here.</h3>
      </>
    );

  // If an error occurred, display an error message
  if (error) return <p>{error.message}</p>;

  return (
    <>
      {/* If the query is loading, display a loading box */}
      {loading ? (
        <>
          <LoadingBox />
        </>
      ) : (
        // If the query is loaded, display the posts sorted by date (newest first)
        [...(data!.getUserPosts.posts as any)]
          ?.sort((p1, p2) => {
            return (
              new Date(p2.createdAt).valueOf() -
              new Date(p1.createdAt).valueOf()
            );
          })
          .map((post, i) => (!post ? null : <Post key={i} post={post} />))
      )}
      {/* If the last post is reached, then display the "Load more" button */}
      {data ? (
        data.getUserPosts.hasMore ? (
          <Button
            onClick={() => {
              fetchMore({
                variables: {
                  limit: variables?.limit,
                  cursor:
                    data.getUserPosts.posts &&
                    data.getUserPosts.posts[data.getUserPosts.posts.length - 1]
                      .createdAt,
                },
              });
            }}
          >
            Load more...
          </Button>
        ) : null
      ) : null}
    </>
  );
};
