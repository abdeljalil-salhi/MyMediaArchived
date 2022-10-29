/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: MessageFragment
// ====================================================

export interface MessageFragment {
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
