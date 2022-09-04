/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreatePost
// ====================================================

export interface CreatePost_createPost_errors {
  __typename: "ErrorResponse";
  field: string | null;
  message: string | null;
}

export interface CreatePost_createPost_post_userObj {
  __typename: "User";
  _id: string;
  firstName: string;
  middleName: string | null;
  lastName: string;
  fullName: string;
  username: string;
  nickname: string | null;
  gender: number;
  phone: string;
  email: string;
  isAdmin: boolean;
  isVerified: boolean;
  isSeller: boolean;
  profile: string;
  cover: string;
  bio: string;
  online: number;
  birthday: string;
  city: string;
  hometown: string;
  relationship: number;
  languages: string[];
  tags: string[];
  socials: string[];
  website: string;
  following: string[];
  followers: string[];
  createdAt: any;
  updatedAt: any;
}

export interface CreatePost_createPost_post {
  __typename: "Post";
  userObj: CreatePost_createPost_post_userObj;
  _id: string;
  user: string;
  isEdited: boolean;
  text: string | null;
  textSnippet: string | null;
  picture: string | null;
  video: string | null;
  file: string | null;
  link: string | null;
  ytvideo: string | null;
  feeling: string | null;
  tags: string[];
  mentions: string[];
  location: string | null;
  reacts: string[];
  comments: string[];
  shares: string[];
  isShared: boolean;
  originalPost: string | null;
  saves: string[];
  reports: string[];
  createdAt: any;
  updatedAt: any;
}

export interface CreatePost_createPost {
  __typename: "PostResponse";
  errors: CreatePost_createPost_errors[] | null;
  post: CreatePost_createPost_post | null;
}

export interface CreatePost {
  createPost: CreatePost_createPost;
}

export interface CreatePostVariables {
  user: string;
  text?: string | null;
  link?: string | null;
  ytvideo?: string | null;
  location?: string | null;
  isMedia: boolean;
  file?: any | null;
}
