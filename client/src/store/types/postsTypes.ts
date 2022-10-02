import { CreatePost_createPost } from "../../generated/types/CreatePost";
import { DeletePost_deletePost } from "../../generated/types/DeletePost";
import {
  GetTimelinePosts,
  GetTimelinePosts_getTimelinePosts,
  GetTimelinePosts_getTimelinePosts_posts,
} from "../../generated/types/GetTimelinePosts";
import {
  GetUserPosts,
  GetUserPosts_getUserPosts,
  GetUserPosts_getUserPosts_posts,
} from "../../generated/types/GetUserPosts";
import { UpdatePost_updatePost } from "../../generated/types/UpdatePost";
import { PaginatedPostsType } from "../typenames";

// Type of the action that will be dispatched to the reducer
export type TPosts = GetTimelinePosts_getTimelinePosts;
export type TNewPosts = CreatePost_createPost;
export type TDeletedPosts = DeletePost_deletePost;
export type TUpdatedPosts = UpdatePost_updatePost;
export type THomePosts = GetTimelinePosts_getTimelinePosts;
export type TProfilePosts = GetUserPosts_getUserPosts;

// Global component type
export type TPost =
  | GetTimelinePosts_getTimelinePosts_posts
  | GetUserPosts_getUserPosts_posts;

// Interface of the posts state in the store
export interface IPostsState {
  data: {
    newPosts:
      | GetTimelinePosts["getTimelinePosts"]
      | GetUserPosts["getUserPosts"];
    deletedPosts: {
      __typename: PaginatedPostsType;
      errors: TDeletedPosts["errors"][];
      posts: TDeletedPosts["deleted"][];
      hasMore: boolean;
    };
    updatedPosts: {
      __typename: PaginatedPostsType;
      errors: TUpdatedPosts["errors"][];
      posts: TUpdatedPosts["post"][];
      hasMore: boolean;
    };
    homePosts: GetTimelinePosts["getTimelinePosts"];
    profilePosts: GetUserPosts["getUserPosts"];
  };
}

// Interfaces for the posts actions
export interface IAddNewPostAction {
  type: string;
  payload: TNewPosts;
}
export interface IAddDeletedPostAction {
  type: string;
  payload: TDeletedPosts;
}
export interface IAddUpdatedPostAction {
  type: string;
  payload: TUpdatedPosts;
}
export interface ISetHomePostsAction {
  type: string;
  payload: THomePosts;
}
export interface ISetProfilePostsAction {
  type: string;
  payload: TProfilePosts;
}
