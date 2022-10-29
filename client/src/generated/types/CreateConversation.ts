/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateConversation
// ====================================================

export interface CreateConversation_createConversation_errors {
  __typename: "ErrorResponse";
  field: string | null;
  message: string | null;
}

export interface CreateConversation_createConversation_conversation_ownerObj {
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

export interface CreateConversation_createConversation_conversation_membersObj {
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

export interface CreateConversation_createConversation_conversation_lastMessageObj {
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

export interface CreateConversation_createConversation_conversation_lastSenderObj {
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

export interface CreateConversation_createConversation_conversation {
  __typename: "Conversation";
  _id: string;
  owner: string;
  members: string[];
  lastMessage: string | null;
  lastSender: string;
  timestamp: number;
  createdAt: any;
  updatedAt: any;
  ownerObj: CreateConversation_createConversation_conversation_ownerObj;
  membersObj: CreateConversation_createConversation_conversation_membersObj[] | null;
  lastMessageObj: CreateConversation_createConversation_conversation_lastMessageObj | null;
  lastSenderObj: CreateConversation_createConversation_conversation_lastSenderObj;
}

export interface CreateConversation_createConversation {
  __typename: "ConversationResponse";
  errors: CreateConversation_createConversation_errors[] | null;
  conversation: CreateConversation_createConversation_conversation | null;
}

export interface CreateConversation {
  createConversation: CreateConversation_createConversation;
}

export interface CreateConversationVariables {
  sender: string;
  receiver: string;
}
