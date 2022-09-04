/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: UserFragment
// ====================================================

export interface UserFragment {
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
