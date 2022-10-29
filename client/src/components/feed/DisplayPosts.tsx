import { FC, useEffect, useState } from "react";
import { createSelector } from "@reduxjs/toolkit";

import { Post } from "../post/Post";
import { makeSelectPosts } from "../../store/selectors/postsSelector";
import { IPostsState, TPost } from "../../store/types/postsTypes";
import { useAppSelector } from "../../store/hooks";
import { isEmpty } from "../../utils/isEmpty";
import { UpdatePost_updatePost_post } from "../../generated/types/UpdatePost";
import { DeletePost_deletePost_deleted } from "../../generated/types/DeletePost";

interface displayPostsProps {
  posts: TPost[];
}

const postsStateSelector = createSelector(
  makeSelectPosts,
  (posts: IPostsState["data"]) => ({
    deletedPosts: posts.deletedPosts,
    updatedPosts: posts.updatedPosts,
  })
);

// Display the posts sorted by date (newest first)
export const DisplayPosts: FC<displayPostsProps> = ({ posts }) => {
  const [postsToDisplay, setPostsToDisplay] = useState<TPost[]>([]);

  // The selector to get state informations from the store (Redux)
  const { deletedPosts, updatedPosts } = useAppSelector(postsStateSelector);

  useEffect(() => {
    // Set the posts to display in the state
    setPostsToDisplay([...posts]);
    // Filter the posts to remove the deleted posts
    if (!isEmpty(deletedPosts.posts))
      deletedPosts.posts.map(
        (deletedPost: DeletePost_deletePost_deleted | null) => {
          return setPostsToDisplay((postsToDisplay: TPost[]) =>
            postsToDisplay.filter(
              (post: TPost) => post._id !== deletedPost!.postId
            )
          );
        }
      );
    if (!isEmpty(updatedPosts.posts))
      updatedPosts.posts.map(
        (updatedPost: UpdatePost_updatePost_post | null) => {
          return setPostsToDisplay((postsToDisplay: TPost[]) =>
            postsToDisplay.map((post: TPost) =>
              post._id === updatedPost!._id ? updatedPost! : post
            )
          );
        }
      );
  }, [deletedPosts.posts, updatedPosts.posts, posts]);

  return (
    <>
      {postsToDisplay
        .sort((p1: TPost, p2: TPost) => {
          return (
            new Date(p2.createdAt).valueOf() - new Date(p1.createdAt).valueOf()
          );
        })
        .map((post: TPost, index: number) =>
          !post ? null : <Post key={index} post={post} />
        )}
    </>
  );
};
