import { IHomePostsState } from "./types/homePostsTypes";
import { INewPostsState } from "./types/newPostsTypes";
import { IProfilePostsState } from "./types/profilePostsTypes";
import { IProfileState } from "./types/profileTypes";

export const profileInitialState: IProfileState = {
  data: {
    __typename: "UserResponse",
    errors: [],
    user: null,
  },
};

export const homePostsInitialState: IHomePostsState = {
  data: {
    __typename: "PaginatedPostsResponse",
    errors: [],
    posts: [],
    hasMore: true,
  },
};

export const newPostsInitialState: INewPostsState = {
  data: {
    __typename: "PaginatedPostsResponse",
    errors: [],
    posts: [],
    hasMore: false,
  },
};

export const profilePostsInitialState: IProfilePostsState = {
  data: {
    __typename: "PaginatedPostsResponse",
    errors: [],
    posts: [],
    hasMore: true,
  },
};
