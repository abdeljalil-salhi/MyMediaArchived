import { CreatePost_createPost } from "../../generated/types/CreatePost";
import { DeletePost_deletePost } from "../../generated/types/DeletePost";
import {
  GetTimelinePosts,
  GetTimelinePosts_getTimelinePosts,
} from "../../generated/types/GetTimelinePosts";
import {
  GetUserPosts,
  GetUserPosts_getUserPosts,
} from "../../generated/types/GetUserPosts";
import { PaginatedPostsType } from "../typenames";

// Type of the action that will be dispatched to the reducer
export type TPosts = GetTimelinePosts_getTimelinePosts;
export type TNewPosts = CreatePost_createPost;
export type TDeletedPosts = DeletePost_deletePost;
export type THomePosts = GetTimelinePosts_getTimelinePosts;
export type TProfilePosts = GetUserPosts_getUserPosts;

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
export interface ISetHomePostsAction {
  type: string;
  payload: THomePosts;
}
export interface ISetProfilePostsAction {
  type: string;
  payload: TProfilePosts;
}
