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
  const { user } = useContext(AuthContext);

  const { data, loading, error, fetchMore, variables } = useGetUserPostsQuery({
    variables: {
      userId: userId as string,
      limit: 15,
      cursor: null as null | string,
    },
    notifyOnNetworkStatusChange: true,
    context: GraphQLAccessToken(user.accessToken),
  });

  if (!loading && !data)
    return (
      <>
        <h3>Sorry, there are no posts to show here.</h3>
      </>
    );

  if (error) return <p>{error.message}</p>;

  return (
    <>
      {loading ? (
        <>
          <LoadingBox />
        </>
      ) : (
        [...(data!.getUserPosts.posts as any)]
          ?.sort((p1, p2) => {
            return (
              new Date(p2.createdAt).valueOf() -
              new Date(p1.createdAt).valueOf()
            );
          })
          .map((post, i) => (!post ? null : <Post key={i} post={post} />))
      )}
      {data ? (
        data.getUserPosts.hasMore ? (
          <Button
            onClick={() => {
              fetchMore({
                variables: {
                  limit: variables?.limit,
                  cursor:
                    data.getUserPosts.posts &&
                    data.getUserPosts.posts[
                      data.getUserPosts.posts.length - 1
                    ].createdAt,
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
