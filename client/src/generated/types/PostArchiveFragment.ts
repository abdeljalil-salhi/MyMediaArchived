/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: PostArchiveFragment
// ====================================================

export interface PostArchiveFragment {
  __typename: "PostArchive";
  _id: string;
  postId: string;
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
