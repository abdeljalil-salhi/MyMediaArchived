import { IHomePostsState } from "./types/homePostsTypes";
import { IProfilePostsState } from "./types/profilePostsTypes";
import { IProfileState } from "./types/profileTypes";

export interface IRootState {
  profile: IProfileState;
  homePosts: IHomePostsState;
  profilePosts: IProfilePostsState;
}
