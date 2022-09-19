import {
  GetUserPosts,
  GetUserPosts_getUserPosts,
} from "../../generated/types/GetUserPosts";

// Type of the action that will be dispatched to the reducer
export type TProfilePosts = GetUserPosts_getUserPosts;

// Interface of the profilePosts state in the store
export interface IProfilePostsState {
  data: GetUserPosts["getUserPosts"];
}

// Interfaces for the profilePosts state reducers
export interface ISetProfilePostsAction {
  type: string;
  payload: TProfilePosts;
}
export interface IDeleteProfilePostAction {
  type: string;
  payload: string;
}
