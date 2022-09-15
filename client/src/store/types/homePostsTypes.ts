import {
  GetTimelinePosts,
  GetTimelinePosts_getTimelinePosts,
} from "../../generated/types/GetTimelinePosts";

export type THomePosts = GetTimelinePosts_getTimelinePosts;

export interface IHomePostsState {
  data: GetTimelinePosts["getTimelinePosts"] | null;
}

export interface IHomePostsAction {
  type: string;
  payload: THomePosts;
}
