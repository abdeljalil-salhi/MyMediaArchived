/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeletePost
// ====================================================

export interface DeletePost_deletePost_errors {
  __typename: "ErrorResponse";
  field: string | null;
  message: string | null;
}

export interface DeletePost_deletePost_deleted {
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

export interface DeletePost_deletePost {
  __typename: "DeletePostResponse";
  errors: DeletePost_deletePost_errors[] | null;
  info: string | null;
  deleted: DeletePost_deletePost_deleted | null;
}

export interface DeletePost {
  deletePost: DeletePost_deletePost;
}

export interface DeletePostVariables {
  userId: string;
  postId: string;
}
