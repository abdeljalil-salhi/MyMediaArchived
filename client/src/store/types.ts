import { IHomePostsState } from "./types/homePostsTypes";
import { INewPostsState } from "./types/newPostsTypes";
import { IProfilePostsState } from "./types/profilePostsTypes";
import { IProfileState } from "./types/profileTypes";

export interface IRootState {
  profile: IProfileState;
  homePosts: IHomePostsState;
  profilePosts: IProfilePostsState;
  newPosts: INewPostsState;
}
