import {
  GetUserPosts,
  GetUserPosts_getUserPosts,
} from "../../generated/types/GetUserPosts";

export type TProfilePosts = GetUserPosts_getUserPosts;

export interface IProfilePostsState {
  data: GetUserPosts["getUserPosts"] | null;
}

export interface IProfilePostsAction {
  type: string;
  payload: TProfilePosts;
}
