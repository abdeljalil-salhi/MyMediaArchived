import { PaginatedPosts, User } from "./typenames";
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
    homePosts: homePostsInitialState,
    profilePosts: profilePostsInitialState,
  },
};
