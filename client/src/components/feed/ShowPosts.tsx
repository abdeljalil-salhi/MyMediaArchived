import { FC } from "react";

import { Post } from "../post/Post";
import { GetTimelinePosts_getTimelinePosts_posts } from "../../generated/types/GetTimelinePosts";

interface showPostsProps {
  posts: GetTimelinePosts_getTimelinePosts_posts[];
  reducer: string;
}

// Display the posts sorted by date (newest first)
export const ShowPosts: FC<showPostsProps> = ({ posts, reducer }) => {
  let postsSorted = [...posts];

  return (
    <>
      {postsSorted
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
          !post ? null : <Post key={index} post={post} reducer={reducer} />
        )}
    </>
  );
};
