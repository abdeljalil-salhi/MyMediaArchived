import {
  GetTimelinePosts,
  GetTimelinePosts_getTimelinePosts,
} from "../../generated/types/GetTimelinePosts";
import {
  GetUserPosts,
  GetUserPosts_getUserPosts,
} from "../../generated/types/GetUserPosts";

export type TPosts =
  | GetTimelinePosts_getTimelinePosts
  | GetUserPosts_getUserPosts;

export interface IPostsState {
  data:
    | GetTimelinePosts["getTimelinePosts"]
    | GetUserPosts["getUserPosts"]
    | null;
}

export interface IPostsAction {
  type: string;
  payload: TPosts;
}
