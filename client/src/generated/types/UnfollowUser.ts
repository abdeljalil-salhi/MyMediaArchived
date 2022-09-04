/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UnfollowUser
// ====================================================

export interface UnfollowUser_unfollowUser_errors {
  __typename: "ErrorResponse";
  field: string | null;
  message: string | null;
}

export interface UnfollowUser_unfollowUser_unfollowing {
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

export interface UnfollowUser_unfollowUser_unfollowed {
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

export interface UnfollowUser_unfollowUser {
  __typename: "UnfollowResponse";
  errors: UnfollowUser_unfollowUser_errors[] | null;
  unfollowing: UnfollowUser_unfollowUser_unfollowing | null;
  unfollowed: UnfollowUser_unfollowUser_unfollowed | null;
}

export interface UnfollowUser {
  unfollowUser: UnfollowUser_unfollowUser;
}

export interface UnfollowUserVariables {
  userId: string;
  userIdToUnfollow: string;
}
