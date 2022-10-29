/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUserConversations
// ====================================================

export interface GetUserConversations_getUserConversations_errors {
  __typename: "ErrorResponse";
  field: string | null;
  message: string | null;
}

export interface GetUserConversations_getUserConversations_conversations_ownerObj {
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

export interface GetUserConversations_getUserConversations_conversations_membersObj {
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

export interface GetUserConversations_getUserConversations_conversations_lastMessageObj {
  __typename: "Message";
  _id: string;
  conversations: string[];
  sender: string;
  text: string | null;
  textSnippet: string | null;
  picture: string | null;
  video: string | null;
  audio: string | null;
  file: string | null;
  link: string | null;
  ytvideo: string | null;
  location: string | null;
  GIF: string | null;
  sticker: string | null;
  profile: string | null;
  isRemoved: boolean;
  deletedBy: string[];
  seenBy: string[];
  reacts: string[];
  createdAt: any;
  updatedAt: any;
}

export interface GetUserConversations_getUserConversations_conversations_lastSenderObj {
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

export interface GetUserConversations_getUserConversations_conversations {
  __typename: "Conversation";
  _id: string;
  owner: string;
  members: string[];
  lastMessage: string | null;
  lastSender: string;
  timestamp: number;
  createdAt: any;
  updatedAt: any;
  ownerObj: GetUserConversations_getUserConversations_conversations_ownerObj;
  membersObj: GetUserConversations_getUserConversations_conversations_membersObj[] | null;
  lastMessageObj: GetUserConversations_getUserConversations_conversations_lastMessageObj | null;
  lastSenderObj: GetUserConversations_getUserConversations_conversations_lastSenderObj;
}

export interface GetUserConversations_getUserConversations {
  __typename: "PaginatedConversationsResponse";
  errors: GetUserConversations_getUserConversations_errors[] | null;
  conversations: GetUserConversations_getUserConversations_conversations[] | null;
  hasMore: boolean | null;
}

export interface GetUserConversations {
  getUserConversations: GetUserConversations_getUserConversations;
}

export interface GetUserConversationsVariables {
  userId: string;
  limit: number;
  cursor?: string | null;
}
