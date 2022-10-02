import { IPostsState } from "./types/postsTypes";
import { IProfileState } from "./types/profileTypes";
import { IConversationsState } from "./types/conversationsTypes";

export interface IRootState {
  profile: IProfileState;
  posts: IPostsState;
  conversations: IConversationsState;
}
