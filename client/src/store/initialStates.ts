import { PaginatedConversations, PaginatedPosts, User } from "./typenames";
import { IConversationsState } from "./types/conversationsTypes";
import { IPostsState } from "./types/postsTypes";
import { IProfileState } from "./types/profileTypes";

export const profileInitialState: IProfileState = {
  data: {
    __typename: User,
    errors: [],
    user: null,
  },
};

export const newPostsInitialState: IPostsState["data"]["newPosts"] = {
  __typename: PaginatedPosts,
  errors: [],
  posts: [],
  hasMore: false,
};
export const deletedPostsInitialState: IPostsState["data"]["deletedPosts"] = {
  __typename: PaginatedPosts,
  errors: [],
  posts: [],
  hasMore: false,
};
export const updatedPostsInitialState: IPostsState["data"]["updatedPosts"] = {
  __typename: PaginatedPosts,
  errors: [],
  posts: [],
  hasMore: false,
};
export const homePostsInitialState: IPostsState["data"]["homePosts"] = {
  __typename: PaginatedPosts,
  errors: [],
  posts: [],
  hasMore: true,
};
export const profilePostsInitialState: IPostsState["data"]["profilePosts"] = {
  __typename: PaginatedPosts,
  errors: [],
  posts: [],
  hasMore: true,
};
export const postsInitialState: IPostsState = {
  data: {
    newPosts: newPostsInitialState,
    deletedPosts: deletedPostsInitialState,
    updatedPosts: updatedPostsInitialState,
    homePosts: homePostsInitialState,
    profilePosts: profilePostsInitialState,
  },
};

export const allConversationsInitialState: IConversationsState["data"]["allConversations"] =
  {
    __typename: PaginatedConversations,
    errors: [],
    conversations: [],
    hasMore: true,
  };
export const currentConversationInitialState: IConversationsState["data"]["currentConversation"] =
  null;
export const conversationsInitialState: IConversationsState = {
  data: {
    allConversations: allConversationsInitialState,
    currentConversation: currentConversationInitialState,
  },
};
