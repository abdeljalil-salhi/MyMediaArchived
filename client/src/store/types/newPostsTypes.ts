import { CreatePost_createPost } from "../../generated/types/CreatePost";
import { IHomePostsState } from "./homePostsTypes";
import { IProfilePostsState } from "./profilePostsTypes";

// Type of the action that will be dispatched to the reducer
export type TNewPosts = CreatePost_createPost;

// Interface of the newPosts state in the store
export type INewPostsState = IHomePostsState | IProfilePostsState;

// Interfaces for the newPosts state reducers
export interface IAddNewPostAction {
  type: string;
  payload: CreatePost_createPost;
}
export interface IDeleteNewPostAction {
  type: string;
  payload: string;
}
