import {
  GetTimelinePosts,
  GetTimelinePosts_getTimelinePosts,
} from "../../generated/types/GetTimelinePosts";

// Type of the action that will be dispatched to the reducer
export type THomePosts = GetTimelinePosts_getTimelinePosts;

// Interface of the homePosts state in the store
export interface IHomePostsState {
  data: GetTimelinePosts["getTimelinePosts"];
}

// Interfaces for the homePosts state reducers
export interface ISetHomePostsAction {
  type: string;
  payload: THomePosts;
}
export interface IDeleteHomePostAction {
  type: string;
  payload: string;
}
