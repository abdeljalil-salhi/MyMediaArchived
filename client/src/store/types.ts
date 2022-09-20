import { IPostsState } from "./types/postsTypes";
import { IProfileState } from "./types/profileTypes";

export interface IRootState {
  profile: IProfileState;
  posts: IPostsState;
}
