import { FC, useContext } from "react";
import { Button } from "@mui/material";

import { useGetTimelinePostsQuery } from "../../generated/graphql";
import { AuthContext } from "../../context/auth.context";
import { LoadingBox } from "../loadingBox/LoadingBox";
import { Post } from "../post/Post";
import { GraphQLAccessToken } from "../../utils/_graphql";

interface HomeFeedProps {}

export const HomeFeed: FC<HomeFeedProps> = () => {
  const { user } = useContext(AuthContext);

  const { data, loading, error, fetchMore, variables } =
    useGetTimelinePostsQuery({
      variables: {
        userId: user._id,
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
        [...(data!.getTimelinePosts.posts as any)]
          ?.sort((p1, p2) => {
            return (
              new Date(p2.createdAt).valueOf() -
              new Date(p1.createdAt).valueOf()
            );
          })
          .map((post, i) => (!post ? null : <Post key={i} post={post} />))
      )}
      {data ? (
        data.getTimelinePosts.hasMore ? (
          <Button
            onClick={() => {
              fetchMore({
                variables: {
                  limit: variables?.limit,
                  cursor:
                    data.getTimelinePosts.posts &&
                    data.getTimelinePosts.posts[
                      data.getTimelinePosts.posts.length - 1
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
