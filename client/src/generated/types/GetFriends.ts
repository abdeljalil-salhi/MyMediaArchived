/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetFriends
// ====================================================

export interface GetFriends_getFriends_errors {
  __typename: "ErrorResponse";
  field: string | null;
  message: string | null;
}

export interface GetFriends_getFriends_user_followingObj {
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

export interface GetFriends_getFriends_user_closeObj {
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

export interface GetFriends_getFriends_user {
  __typename: "User";
  _id: string;
  username: string;
  followingObj: GetFriends_getFriends_user_followingObj[] | null;
  closeObj: GetFriends_getFriends_user_closeObj[] | null;
}

export interface GetFriends_getFriends {
  __typename: "UserResponse";
  errors: GetFriends_getFriends_errors[] | null;
  user: GetFriends_getFriends_user | null;
}

export interface GetFriends {
  getFriends: GetFriends_getFriends;
}

export interface GetFriendsVariables {
  userId: string;
}
