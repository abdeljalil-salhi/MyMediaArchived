/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ReactPost
// ====================================================

export interface ReactPost_reactPost_errors {
  __typename: "ErrorResponse";
  field: string | null;
  message: string | null;
}

export interface ReactPost_reactPost_post_userObj {
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

export interface ReactPost_reactPost_post {
  __typename: "Post";
  userObj: ReactPost_reactPost_post_userObj;
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

export interface ReactPost_reactPost {
  __typename: "PostResponse";
  errors: ReactPost_reactPost_errors[] | null;
  post: ReactPost_reactPost_post | null;
}

export interface ReactPost {
  reactPost: ReactPost_reactPost;
}

export interface ReactPostVariables {
  userId: string;
  postId: string;
  react: number;
}
