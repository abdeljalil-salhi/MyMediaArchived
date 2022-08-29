import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  Upload: any;
};

export type Comment = {
  __typename?: 'Comment';
  _id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  file?: Maybe<Scalars['String']>;
  link?: Maybe<Scalars['String']>;
  picture?: Maybe<Scalars['String']>;
  reacts: Array<Scalars['String']>;
  reactsObj?: Maybe<Array<CommentReact>>;
  replies: Array<Scalars['String']>;
  repliesObj?: Maybe<Array<Reply>>;
  reports: Array<Scalars['String']>;
  reportsObj?: Maybe<Array<CommentReport>>;
  text?: Maybe<Scalars['String']>;
  textSnippet?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  user: Scalars['String'];
  userObj: User;
  video?: Maybe<Scalars['String']>;
  ytvideo?: Maybe<Scalars['String']>;
};

export type CommentReact = {
  __typename?: 'CommentReact';
  _id: Scalars['String'];
  commentId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  react: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
  user: Scalars['String'];
  userObj: User;
};

export type CommentReport = {
  __typename?: 'CommentReport';
  _id: Scalars['String'];
  comment: Scalars['String'];
  commentObj: Comment;
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  reason: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: Scalars['String'];
  userObj: User;
};

export type CreatePostInput = {
  file?: InputMaybe<Scalars['String']>;
  link?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<Scalars['String']>;
  picture?: InputMaybe<Scalars['String']>;
  text?: InputMaybe<Scalars['String']>;
  user?: InputMaybe<Scalars['String']>;
  video?: InputMaybe<Scalars['String']>;
  ytvideo?: InputMaybe<Scalars['String']>;
};

export type DeletePostResponse = {
  __typename?: 'DeletePostResponse';
  deleted?: Maybe<PostArchive>;
  errors?: Maybe<Array<ErrorResponse>>;
  info?: Maybe<Scalars['String']>;
};

export type DeleteUserResponse = {
  __typename?: 'DeleteUserResponse';
  deleted?: Maybe<UserArchive>;
  errors?: Maybe<Array<ErrorResponse>>;
  info?: Maybe<Scalars['String']>;
};

export type ErrorResponse = {
  __typename?: 'ErrorResponse';
  field?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
};

export type Feeling = {
  __typename?: 'Feeling';
  _id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  name: Scalars['String'];
  picture: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type FollowResponse = {
  __typename?: 'FollowResponse';
  errors?: Maybe<Array<ErrorResponse>>;
  followed?: Maybe<User>;
  following?: Maybe<User>;
};

export type ForgotPasswordToken = {
  __typename?: 'ForgotPasswordToken';
  _id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  expiresAt: Scalars['DateTime'];
  token: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: Scalars['String'];
  userObj: User;
};

export type Highlight = {
  __typename?: 'Highlight';
  _id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  group: Scalars['String'];
  stories: Array<Story>;
  storiesObj?: Maybe<Array<User>>;
  updatedAt: Scalars['DateTime'];
  user: Scalars['String'];
  userObj: User;
};

export type MediaResponse = {
  __typename?: 'MediaResponse';
  errors?: Maybe<Array<ErrorResponse>>;
  media?: Maybe<MediaType>;
};

export type MediaType = {
  __typename?: 'MediaType';
  mimetype?: Maybe<Scalars['String']>;
  path?: Maybe<Scalars['String']>;
};

export type Music = {
  __typename?: 'Music';
  _id: Scalars['String'];
  addedBy: Scalars['String'];
  addedByObj: User;
  album?: Maybe<Scalars['String']>;
  artist: Scalars['String'];
  createdAt: Scalars['DateTime'];
  duration: Scalars['Int'];
  file: Scalars['String'];
  genre?: Maybe<Scalars['String']>;
  lyrics: Scalars['String'];
  picture: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addCloseFriend: UserResponse;
  changePassword: UserResponse;
  coverPicture: MediaResponse;
  createPost: PostResponse;
  deletePost: DeletePostResponse;
  deleteUser: DeleteUserResponse;
  followUser: FollowResponse;
  forgotPassword: TokenResponse;
  login: UserResponse;
  postMedia: MediaResponse;
  profilePicture: MediaResponse;
  reactPost: PostResponse;
  register: UserResponse;
  removeCloseFriend: UserResponse;
  unfollowUser: UnfollowResponse;
  unreactPost: PostResponse;
  updatePost: PostResponse;
  updateSocials: UserResponse;
  updateTags: UserResponse;
  updateUser: UserResponse;
};


export type MutationAddCloseFriendArgs = {
  userId: Scalars['String'];
  userIdToAdd: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationCoverPictureArgs = {
  file: Scalars['Upload'];
};


export type MutationCreatePostArgs = {
  file?: InputMaybe<Scalars['Upload']>;
  input: CreatePostInput;
  isMedia: Scalars['Boolean'];
};


export type MutationDeletePostArgs = {
  postId: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationDeleteUserArgs = {
  userId: Scalars['String'];
};


export type MutationFollowUserArgs = {
  userId: Scalars['String'];
  userIdToFollow: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationPostMediaArgs = {
  file: Scalars['Upload'];
};


export type MutationProfilePictureArgs = {
  file: Scalars['Upload'];
};


export type MutationReactPostArgs = {
  input: ReactInput;
  postId: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationRemoveCloseFriendArgs = {
  userId: Scalars['String'];
  userIdToRemove: Scalars['String'];
};


export type MutationUnfollowUserArgs = {
  userId: Scalars['String'];
  userIdToUnfollow: Scalars['String'];
};


export type MutationUnreactPostArgs = {
  postId: Scalars['String'];
  reactId: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationUpdatePostArgs = {
  input: UpdatePostInput;
  postId: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationUpdateSocialsArgs = {
  input: UpdateSocialsInput;
};


export type MutationUpdateTagsArgs = {
  input: UpdateTagsInput;
};


export type MutationUpdateUserArgs = {
  accessToken: Scalars['String'];
  input: UpdateUserInput;
  userId: Scalars['String'];
};

export type PaginatedPostsResponse = {
  __typename?: 'PaginatedPostsResponse';
  errors?: Maybe<Array<ErrorResponse>>;
  hasMore?: Maybe<Scalars['Boolean']>;
  posts?: Maybe<Array<Post>>;
};

export type Post = {
  __typename?: 'Post';
  _id: Scalars['String'];
  comments: Array<Scalars['String']>;
  commentsObj?: Maybe<Array<Comment>>;
  createdAt: Scalars['DateTime'];
  feeling?: Maybe<Scalars['String']>;
  feelingObj: Feeling;
  file?: Maybe<Scalars['String']>;
  isEdited: Scalars['Boolean'];
  isShared: Scalars['Boolean'];
  link?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  mentions: Array<Scalars['String']>;
  mentionsObj?: Maybe<Array<User>>;
  originalPost?: Maybe<Scalars['String']>;
  originalPostObj?: Maybe<Post>;
  picture?: Maybe<Scalars['String']>;
  reacts: Array<Scalars['String']>;
  reactsObj?: Maybe<Array<PostReact>>;
  reports: Array<Scalars['String']>;
  reportsObj?: Maybe<Array<PostReport>>;
  saves: Array<Scalars['String']>;
  shares: Array<Scalars['String']>;
  tags: Array<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
  textSnippet?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  user: Scalars['String'];
  userObj: User;
  video?: Maybe<Scalars['String']>;
  ytvideo?: Maybe<Scalars['String']>;
};

export type PostArchive = {
  __typename?: 'PostArchive';
  _id: Scalars['String'];
  comments: Array<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  feeling?: Maybe<Scalars['String']>;
  feelingObj: Feeling;
  file?: Maybe<Scalars['String']>;
  isEdited: Scalars['Boolean'];
  isShared: Scalars['Boolean'];
  link?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  mentions: Array<Scalars['String']>;
  mentionsObj?: Maybe<Array<User>>;
  originalPost?: Maybe<Scalars['String']>;
  originalPostObj?: Maybe<Post>;
  picture?: Maybe<Scalars['String']>;
  postId: Scalars['String'];
  reacts: Array<Scalars['String']>;
  reports: Array<Scalars['String']>;
  reportsObj?: Maybe<Array<PostReport>>;
  saves: Array<Scalars['String']>;
  shares: Array<Scalars['String']>;
  tags: Array<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
  textSnippet?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  user: Scalars['String'];
  video?: Maybe<Scalars['String']>;
  ytvideo?: Maybe<Scalars['String']>;
};

export type PostReact = {
  __typename?: 'PostReact';
  _id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  postId: Scalars['String'];
  react: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
  user: Scalars['String'];
  userObj: User;
};

export type PostReport = {
  __typename?: 'PostReport';
  _id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  post: Scalars['String'];
  postObj: Post;
  reason: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: Scalars['String'];
  userObj: User;
};

export type PostResponse = {
  __typename?: 'PostResponse';
  errors?: Maybe<Array<ErrorResponse>>;
  post?: Maybe<Post>;
};

export type PostsResponse = {
  __typename?: 'PostsResponse';
  errors?: Maybe<Array<ErrorResponse>>;
  posts?: Maybe<Array<Post>>;
};

export type Query = {
  __typename?: 'Query';
  getAllPosts: PostsResponse;
  getAllUsers: UsersResponse;
  getFriends: UserResponse;
  getPost: PostResponse;
  getProfile: UserResponse;
  getTimelinePosts: PaginatedPostsResponse;
  getUser: UserResponse;
  getUserPosts: PaginatedPostsResponse;
  ping: Scalars['String'];
};


export type QueryGetFriendsArgs = {
  userId: Scalars['String'];
};


export type QueryGetPostArgs = {
  postId: Scalars['String'];
};


export type QueryGetProfileArgs = {
  username: Scalars['String'];
};


export type QueryGetTimelinePostsArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
  userId: Scalars['String'];
};


export type QueryGetUserArgs = {
  userId: Scalars['String'];
};


export type QueryGetUserPostsArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
  userId: Scalars['String'];
};

export type ReactInput = {
  react: Scalars['Int'];
};

export type RegisterInput = {
  birthday: Scalars['String'];
  cover?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  fullName: Scalars['String'];
  gender: Scalars['Int'];
  isAdmin?: InputMaybe<Scalars['Boolean']>;
  lastName: Scalars['String'];
  middleName?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  profile?: InputMaybe<Scalars['String']>;
  username: Scalars['String'];
};

export type Reply = {
  __typename?: 'Reply';
  _id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  file?: Maybe<Scalars['String']>;
  link?: Maybe<Scalars['String']>;
  picture?: Maybe<Scalars['String']>;
  reacts: Array<Scalars['String']>;
  reactsObj?: Maybe<Array<ReplyReact>>;
  reports: Array<Scalars['String']>;
  reportsObj?: Maybe<Array<ReplyReport>>;
  text?: Maybe<Scalars['String']>;
  textSnippet?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  user: Scalars['String'];
  userObj: User;
  video?: Maybe<Scalars['String']>;
  ytvideo?: Maybe<Scalars['String']>;
};

export type ReplyReact = {
  __typename?: 'ReplyReact';
  _id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  react: Scalars['Int'];
  replyId: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: Scalars['String'];
  userObj: User;
};

export type ReplyReport = {
  __typename?: 'ReplyReport';
  _id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  reason: Scalars['String'];
  reply: Scalars['String'];
  replyObj: Reply;
  updatedAt: Scalars['DateTime'];
  user: Scalars['String'];
  userObj: User;
};

export type Seller = {
  __typename?: 'Seller';
  _id: Scalars['String'];
  address?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  logo: Scalars['String'];
  name: Scalars['String'];
  phone: Scalars['String'];
  rating: Scalars['Float'];
  reviews: Array<Scalars['String']>;
  socials: Array<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
  website?: Maybe<Scalars['String']>;
  zip?: Maybe<Scalars['String']>;
};

export type Story = {
  __typename?: 'Story';
  _id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  expiresAt: Scalars['DateTime'];
  feeling?: Maybe<Scalars['String']>;
  feelingObj: Feeling;
  hashtag: Scalars['String'];
  isQuestions: Scalars['Boolean'];
  link: Scalars['String'];
  location: Scalars['String'];
  mentions: Array<Scalars['String']>;
  mentionsObj?: Maybe<Array<User>>;
  music?: Maybe<Scalars['String']>;
  musicObj: Music;
  picture: Scalars['String'];
  questions: Array<Scalars['String']>;
  questionsObj?: Maybe<Array<StoryQuestion>>;
  reacts: Array<Scalars['String']>;
  reactsObj?: Maybe<Array<StoryReact>>;
  reports: Array<Scalars['String']>;
  reportsObj?: Maybe<Array<StoryReport>>;
  shares: Array<Scalars['String']>;
  sharesObj?: Maybe<Array<StoryShare>>;
  text: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: Scalars['String'];
  userObj: User;
  video: Scalars['String'];
  views: Array<Scalars['String']>;
  viewsObj?: Maybe<Array<User>>;
};

export type StoryQuestion = {
  __typename?: 'StoryQuestion';
  _id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  expiresAt: Scalars['DateTime'];
  question: Scalars['String'];
  storyId: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: User;
  userObj: User;
};

export type StoryReact = {
  __typename?: 'StoryReact';
  _id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  expiresAt: Scalars['DateTime'];
  react: Scalars['Int'];
  storyId: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: Scalars['String'];
  userObj: User;
};

export type StoryReport = {
  __typename?: 'StoryReport';
  _id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  reason: Scalars['String'];
  storyId: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: User;
  userObj: User;
};

export type StoryShare = {
  __typename?: 'StoryShare';
  _id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  storyId: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: User;
  userObj: User;
};

export type TokenResponse = {
  __typename?: 'TokenResponse';
  errors?: Maybe<Array<ErrorResponse>>;
  token?: Maybe<ForgotPasswordToken>;
};

export type UnfollowResponse = {
  __typename?: 'UnfollowResponse';
  errors?: Maybe<Array<ErrorResponse>>;
  unfollowed?: Maybe<User>;
  unfollowing?: Maybe<User>;
};

export type UpdatePostInput = {
  isEdited?: InputMaybe<Scalars['Boolean']>;
  link?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<Scalars['String']>;
  text?: InputMaybe<Scalars['String']>;
  ytvideo?: InputMaybe<Scalars['String']>;
};

export type UpdateSocialsInput = {
  socials?: InputMaybe<Array<Scalars['String']>>;
  userId?: InputMaybe<Scalars['String']>;
};

export type UpdateTagsInput = {
  tags?: InputMaybe<Array<Scalars['String']>>;
  userId?: InputMaybe<Scalars['String']>;
};

export type UpdateUserInput = {
  bio?: InputMaybe<Scalars['String']>;
  birthday?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  cover?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  fullName?: InputMaybe<Scalars['String']>;
  hometown?: InputMaybe<Scalars['String']>;
  isAdmin?: InputMaybe<Scalars['Boolean']>;
  isSeller?: InputMaybe<Scalars['Boolean']>;
  isVerified?: InputMaybe<Scalars['Boolean']>;
  lastName?: InputMaybe<Scalars['String']>;
  middleName?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  profile?: InputMaybe<Scalars['String']>;
  relationship?: InputMaybe<Scalars['Int']>;
  username?: InputMaybe<Scalars['String']>;
  website?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['String'];
  accessToken?: Maybe<Scalars['String']>;
  bio: Scalars['String'];
  birthday: Scalars['String'];
  city: Scalars['String'];
  close: Array<Scalars['String']>;
  closeObj?: Maybe<Array<User>>;
  cover: Scalars['String'];
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  followers: Array<Scalars['String']>;
  followersObj?: Maybe<Array<User>>;
  following: Array<Scalars['String']>;
  followingObj?: Maybe<Array<User>>;
  fullName: Scalars['String'];
  gender: Scalars['Int'];
  highlights: Array<Scalars['String']>;
  highlightsObj?: Maybe<Array<Highlight>>;
  hometown: Scalars['String'];
  isAdmin: Scalars['Boolean'];
  isSeller: Scalars['Boolean'];
  isVerified: Scalars['Boolean'];
  languages: Array<Scalars['String']>;
  lastName: Scalars['String'];
  likes: Array<Scalars['String']>;
  likesObj?: Maybe<Array<Post>>;
  middleName?: Maybe<Scalars['String']>;
  nickname?: Maybe<Scalars['String']>;
  online: Scalars['Float'];
  phone: Scalars['String'];
  profile: Scalars['String'];
  relationship: Scalars['Int'];
  saved: Array<Scalars['String']>;
  savedObj?: Maybe<Array<Post>>;
  seller?: Maybe<Scalars['String']>;
  sellerObj?: Maybe<Seller>;
  socials: Array<Scalars['String']>;
  tags: Array<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
  website: Scalars['String'];
};

export type UserArchive = {
  __typename?: 'UserArchive';
  _id: Scalars['String'];
  bio: Scalars['String'];
  birthday: Scalars['String'];
  city: Scalars['String'];
  close: Array<Scalars['String']>;
  cover: Scalars['String'];
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  followers: Array<Scalars['String']>;
  following: Array<Scalars['String']>;
  fullName: Scalars['String'];
  gender: Scalars['Int'];
  highlights: Array<Scalars['String']>;
  hometown: Scalars['String'];
  isAdmin: Scalars['Boolean'];
  isSeller: Scalars['Boolean'];
  isVerified: Scalars['Boolean'];
  languages: Array<Scalars['String']>;
  lastName: Scalars['String'];
  likes: Array<Scalars['String']>;
  middleName?: Maybe<Scalars['String']>;
  nickname?: Maybe<Scalars['String']>;
  online: Scalars['Float'];
  phone: Scalars['String'];
  profile: Scalars['String'];
  relationship: Scalars['Int'];
  saved: Array<Scalars['String']>;
  socials: Array<Scalars['String']>;
  tags: Array<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
  username: Scalars['String'];
  website: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<ErrorResponse>>;
  user?: Maybe<User>;
};

export type UsersResponse = {
  __typename?: 'UsersResponse';
  errors?: Maybe<Array<ErrorResponse>>;
  users?: Maybe<Array<User>>;
};

export type ErrorFragmentFragment = { __typename?: 'ErrorResponse', field?: string | null, message?: string | null };

export type PostArchiveFragmentFragment = { __typename?: 'PostArchive', _id: string, postId: string, user: string, isEdited: boolean, text?: string | null, textSnippet?: string | null, picture?: string | null, video?: string | null, file?: string | null, link?: string | null, ytvideo?: string | null, feeling?: string | null, tags: Array<string>, mentions: Array<string>, location?: string | null, reacts: Array<string>, comments: Array<string>, shares: Array<string>, isShared: boolean, originalPost?: string | null, saves: Array<string>, reports: Array<string>, createdAt: any, updatedAt: any };

export type PostFragmentFragment = { __typename?: 'Post', _id: string, user: string, isEdited: boolean, text?: string | null, textSnippet?: string | null, picture?: string | null, video?: string | null, file?: string | null, link?: string | null, ytvideo?: string | null, feeling?: string | null, tags: Array<string>, mentions: Array<string>, location?: string | null, reacts: Array<string>, comments: Array<string>, shares: Array<string>, isShared: boolean, originalPost?: string | null, saves: Array<string>, reports: Array<string>, createdAt: any, updatedAt: any };

export type UserFragmentFragment = { __typename?: 'User', _id: string, firstName: string, middleName?: string | null, lastName: string, fullName: string, username: string, nickname?: string | null, gender: number, phone: string, email: string, isAdmin: boolean, isVerified: boolean, isSeller: boolean, profile: string, cover: string, bio: string, online: number, birthday: string, city: string, hometown: string, relationship: number, languages: Array<string>, tags: Array<string>, socials: Array<string>, website: string, following: Array<string>, followers: Array<string>, createdAt: any, updatedAt: any };

export type CreatePostMutationVariables = Exact<{
  user: Scalars['String'];
  text?: InputMaybe<Scalars['String']>;
  link?: InputMaybe<Scalars['String']>;
  ytvideo?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<Scalars['String']>;
  isMedia: Scalars['Boolean'];
  file?: InputMaybe<Scalars['Upload']>;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'PostResponse', errors?: Array<{ __typename?: 'ErrorResponse', field?: string | null, message?: string | null }> | null, post?: { __typename?: 'Post', _id: string, user: string, isEdited: boolean, text?: string | null, textSnippet?: string | null, picture?: string | null, video?: string | null, file?: string | null, link?: string | null, ytvideo?: string | null, feeling?: string | null, tags: Array<string>, mentions: Array<string>, location?: string | null, reacts: Array<string>, comments: Array<string>, shares: Array<string>, isShared: boolean, originalPost?: string | null, saves: Array<string>, reports: Array<string>, createdAt: any, updatedAt: any, userObj: { __typename?: 'User', _id: string, firstName: string, middleName?: string | null, lastName: string, fullName: string, username: string, nickname?: string | null, gender: number, phone: string, email: string, isAdmin: boolean, isVerified: boolean, isSeller: boolean, profile: string, cover: string, bio: string, online: number, birthday: string, city: string, hometown: string, relationship: number, languages: Array<string>, tags: Array<string>, socials: Array<string>, website: string, following: Array<string>, followers: Array<string>, createdAt: any, updatedAt: any } } | null } };

export type DeletePostMutationVariables = Exact<{
  userId: Scalars['String'];
  postId: Scalars['String'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost: { __typename?: 'DeletePostResponse', info?: string | null, errors?: Array<{ __typename?: 'ErrorResponse', field?: string | null, message?: string | null }> | null, deleted?: { __typename?: 'PostArchive', _id: string, postId: string, user: string, isEdited: boolean, text?: string | null, textSnippet?: string | null, picture?: string | null, video?: string | null, file?: string | null, link?: string | null, ytvideo?: string | null, feeling?: string | null, tags: Array<string>, mentions: Array<string>, location?: string | null, reacts: Array<string>, comments: Array<string>, shares: Array<string>, isShared: boolean, originalPost?: string | null, saves: Array<string>, reports: Array<string>, createdAt: any, updatedAt: any } | null } };

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'ErrorResponse', field?: string | null, message?: string | null }> | null, user?: { __typename?: 'User', likes: Array<string>, saved: Array<string>, highlights: Array<string>, accessToken?: string | null, _id: string, firstName: string, middleName?: string | null, lastName: string, fullName: string, username: string, nickname?: string | null, gender: number, phone: string, email: string, isAdmin: boolean, isVerified: boolean, isSeller: boolean, profile: string, cover: string, bio: string, online: number, birthday: string, city: string, hometown: string, relationship: number, languages: Array<string>, tags: Array<string>, socials: Array<string>, website: string, following: Array<string>, followers: Array<string>, createdAt: any, updatedAt: any, followersObj?: Array<{ __typename?: 'User', _id: string, firstName: string, middleName?: string | null, lastName: string, fullName: string, username: string, nickname?: string | null, gender: number, phone: string, email: string, isAdmin: boolean, isVerified: boolean, isSeller: boolean, profile: string, cover: string, bio: string, online: number, birthday: string, city: string, hometown: string, relationship: number, languages: Array<string>, tags: Array<string>, socials: Array<string>, website: string, following: Array<string>, followers: Array<string>, createdAt: any, updatedAt: any }> | null, followingObj?: Array<{ __typename?: 'User', _id: string, firstName: string, middleName?: string | null, lastName: string, fullName: string, username: string, nickname?: string | null, gender: number, phone: string, email: string, isAdmin: boolean, isVerified: boolean, isSeller: boolean, profile: string, cover: string, bio: string, online: number, birthday: string, city: string, hometown: string, relationship: number, languages: Array<string>, tags: Array<string>, socials: Array<string>, website: string, following: Array<string>, followers: Array<string>, createdAt: any, updatedAt: any }> | null, closeObj?: Array<{ __typename?: 'User', _id: string, firstName: string, middleName?: string | null, lastName: string, fullName: string, username: string, nickname?: string | null, gender: number, phone: string, email: string, isAdmin: boolean, isVerified: boolean, isSeller: boolean, profile: string, cover: string, bio: string, online: number, birthday: string, city: string, hometown: string, relationship: number, languages: Array<string>, tags: Array<string>, socials: Array<string>, website: string, following: Array<string>, followers: Array<string>, createdAt: any, updatedAt: any }> | null } | null } };

export type RegisterMutationVariables = Exact<{
  firstName: Scalars['String'];
  middleName?: InputMaybe<Scalars['String']>;
  lastName: Scalars['String'];
  fullName: Scalars['String'];
  username: Scalars['String'];
  gender: Scalars['Int'];
  email: Scalars['String'];
  password: Scalars['String'];
  birthday: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'ErrorResponse', field?: string | null, message?: string | null }> | null, user?: { __typename?: 'User', likes: Array<string>, saved: Array<string>, highlights: Array<string>, accessToken?: string | null, _id: string, firstName: string, middleName?: string | null, lastName: string, fullName: string, username: string, nickname?: string | null, gender: number, phone: string, email: string, isAdmin: boolean, isVerified: boolean, isSeller: boolean, profile: string, cover: string, bio: string, online: number, birthday: string, city: string, hometown: string, relationship: number, languages: Array<string>, tags: Array<string>, socials: Array<string>, website: string, following: Array<string>, followers: Array<string>, createdAt: any, updatedAt: any, followersObj?: Array<{ __typename?: 'User', _id: string, firstName: string, middleName?: string | null, lastName: string, fullName: string, username: string, nickname?: string | null, gender: number, phone: string, email: string, isAdmin: boolean, isVerified: boolean, isSeller: boolean, profile: string, cover: string, bio: string, online: number, birthday: string, city: string, hometown: string, relationship: number, languages: Array<string>, tags: Array<string>, socials: Array<string>, website: string, following: Array<string>, followers: Array<string>, createdAt: any, updatedAt: any }> | null, followingObj?: Array<{ __typename?: 'User', _id: string, firstName: string, middleName?: string | null, lastName: string, fullName: string, username: string, nickname?: string | null, gender: number, phone: string, email: string, isAdmin: boolean, isVerified: boolean, isSeller: boolean, profile: string, cover: string, bio: string, online: number, birthday: string, city: string, hometown: string, relationship: number, languages: Array<string>, tags: Array<string>, socials: Array<string>, website: string, following: Array<string>, followers: Array<string>, createdAt: any, updatedAt: any }> | null, closeObj?: Array<{ __typename?: 'User', _id: string, firstName: string, middleName?: string | null, lastName: string, fullName: string, username: string, nickname?: string | null, gender: number, phone: string, email: string, isAdmin: boolean, isVerified: boolean, isSeller: boolean, profile: string, cover: string, bio: string, online: number, birthday: string, city: string, hometown: string, relationship: number, languages: Array<string>, tags: Array<string>, socials: Array<string>, website: string, following: Array<string>, followers: Array<string>, createdAt: any, updatedAt: any }> | null } | null } };

export type GetProfileQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type GetProfileQuery = { __typename?: 'Query', getProfile: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'ErrorResponse', field?: string | null, message?: string | null }> | null, user?: { __typename?: 'User', likes: Array<string>, saved: Array<string>, highlights: Array<string>, _id: string, firstName: string, middleName?: string | null, lastName: string, fullName: string, username: string, nickname?: string | null, gender: number, phone: string, email: string, isAdmin: boolean, isVerified: boolean, isSeller: boolean, profile: string, cover: string, bio: string, online: number, birthday: string, city: string, hometown: string, relationship: number, languages: Array<string>, tags: Array<string>, socials: Array<string>, website: string, following: Array<string>, followers: Array<string>, createdAt: any, updatedAt: any, followersObj?: Array<{ __typename?: 'User', _id: string, firstName: string, middleName?: string | null, lastName: string, fullName: string, username: string, nickname?: string | null, gender: number, phone: string, email: string, isAdmin: boolean, isVerified: boolean, isSeller: boolean, profile: string, cover: string, bio: string, online: number, birthday: string, city: string, hometown: string, relationship: number, languages: Array<string>, tags: Array<string>, socials: Array<string>, website: string, following: Array<string>, followers: Array<string>, createdAt: any, updatedAt: any }> | null, followingObj?: Array<{ __typename?: 'User', _id: string, firstName: string, middleName?: string | null, lastName: string, fullName: string, username: string, nickname?: string | null, gender: number, phone: string, email: string, isAdmin: boolean, isVerified: boolean, isSeller: boolean, profile: string, cover: string, bio: string, online: number, birthday: string, city: string, hometown: string, relationship: number, languages: Array<string>, tags: Array<string>, socials: Array<string>, website: string, following: Array<string>, followers: Array<string>, createdAt: any, updatedAt: any }> | null, closeObj?: Array<{ __typename?: 'User', _id: string, firstName: string, middleName?: string | null, lastName: string, fullName: string, username: string, nickname?: string | null, gender: number, phone: string, email: string, isAdmin: boolean, isVerified: boolean, isSeller: boolean, profile: string, cover: string, bio: string, online: number, birthday: string, city: string, hometown: string, relationship: number, languages: Array<string>, tags: Array<string>, socials: Array<string>, website: string, following: Array<string>, followers: Array<string>, createdAt: any, updatedAt: any }> | null } | null } };

export type GetTimelinePostsQueryVariables = Exact<{
  userId: Scalars['String'];
  limit: Scalars['Int'];
  cursor?: InputMaybe<Scalars['String']>;
}>;


export type GetTimelinePostsQuery = { __typename?: 'Query', getTimelinePosts: { __typename?: 'PaginatedPostsResponse', hasMore?: boolean | null, errors?: Array<{ __typename?: 'ErrorResponse', field?: string | null, message?: string | null }> | null, posts?: Array<{ __typename?: 'Post', _id: string, user: string, isEdited: boolean, text?: string | null, textSnippet?: string | null, picture?: string | null, video?: string | null, file?: string | null, link?: string | null, ytvideo?: string | null, feeling?: string | null, tags: Array<string>, mentions: Array<string>, location?: string | null, reacts: Array<string>, comments: Array<string>, shares: Array<string>, isShared: boolean, originalPost?: string | null, saves: Array<string>, reports: Array<string>, createdAt: any, updatedAt: any, userObj: { __typename?: 'User', _id: string, firstName: string, middleName?: string | null, lastName: string, fullName: string, username: string, nickname?: string | null, gender: number, phone: string, email: string, isAdmin: boolean, isVerified: boolean, isSeller: boolean, profile: string, cover: string, bio: string, online: number, birthday: string, city: string, hometown: string, relationship: number, languages: Array<string>, tags: Array<string>, socials: Array<string>, website: string, following: Array<string>, followers: Array<string>, createdAt: any, updatedAt: any } }> | null } };

export type GetUserQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type GetUserQuery = { __typename?: 'Query', getUser: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'ErrorResponse', field?: string | null, message?: string | null }> | null, user?: { __typename?: 'User', likes: Array<string>, saved: Array<string>, highlights: Array<string>, _id: string, firstName: string, middleName?: string | null, lastName: string, fullName: string, username: string, nickname?: string | null, gender: number, phone: string, email: string, isAdmin: boolean, isVerified: boolean, isSeller: boolean, profile: string, cover: string, bio: string, online: number, birthday: string, city: string, hometown: string, relationship: number, languages: Array<string>, tags: Array<string>, socials: Array<string>, website: string, following: Array<string>, followers: Array<string>, createdAt: any, updatedAt: any, followersObj?: Array<{ __typename?: 'User', _id: string, firstName: string, middleName?: string | null, lastName: string, fullName: string, username: string, nickname?: string | null, gender: number, phone: string, email: string, isAdmin: boolean, isVerified: boolean, isSeller: boolean, profile: string, cover: string, bio: string, online: number, birthday: string, city: string, hometown: string, relationship: number, languages: Array<string>, tags: Array<string>, socials: Array<string>, website: string, following: Array<string>, followers: Array<string>, createdAt: any, updatedAt: any }> | null, followingObj?: Array<{ __typename?: 'User', _id: string, firstName: string, middleName?: string | null, lastName: string, fullName: string, username: string, nickname?: string | null, gender: number, phone: string, email: string, isAdmin: boolean, isVerified: boolean, isSeller: boolean, profile: string, cover: string, bio: string, online: number, birthday: string, city: string, hometown: string, relationship: number, languages: Array<string>, tags: Array<string>, socials: Array<string>, website: string, following: Array<string>, followers: Array<string>, createdAt: any, updatedAt: any }> | null, closeObj?: Array<{ __typename?: 'User', _id: string, firstName: string, middleName?: string | null, lastName: string, fullName: string, username: string, nickname?: string | null, gender: number, phone: string, email: string, isAdmin: boolean, isVerified: boolean, isSeller: boolean, profile: string, cover: string, bio: string, online: number, birthday: string, city: string, hometown: string, relationship: number, languages: Array<string>, tags: Array<string>, socials: Array<string>, website: string, following: Array<string>, followers: Array<string>, createdAt: any, updatedAt: any }> | null } | null } };

export type GetUserPostsQueryVariables = Exact<{
  userId: Scalars['String'];
  limit: Scalars['Int'];
  cursor?: InputMaybe<Scalars['String']>;
}>;


export type GetUserPostsQuery = { __typename?: 'Query', getUserPosts: { __typename?: 'PaginatedPostsResponse', hasMore?: boolean | null, errors?: Array<{ __typename?: 'ErrorResponse', field?: string | null, message?: string | null }> | null, posts?: Array<{ __typename?: 'Post', _id: string, user: string, isEdited: boolean, text?: string | null, textSnippet?: string | null, picture?: string | null, video?: string | null, file?: string | null, link?: string | null, ytvideo?: string | null, feeling?: string | null, tags: Array<string>, mentions: Array<string>, location?: string | null, reacts: Array<string>, comments: Array<string>, shares: Array<string>, isShared: boolean, originalPost?: string | null, saves: Array<string>, reports: Array<string>, createdAt: any, updatedAt: any, userObj: { __typename?: 'User', _id: string, firstName: string, middleName?: string | null, lastName: string, fullName: string, username: string, nickname?: string | null, gender: number, phone: string, email: string, isAdmin: boolean, isVerified: boolean, isSeller: boolean, profile: string, cover: string, bio: string, online: number, birthday: string, city: string, hometown: string, relationship: number, languages: Array<string>, tags: Array<string>, socials: Array<string>, website: string, following: Array<string>, followers: Array<string>, createdAt: any, updatedAt: any } }> | null } };

export const ErrorFragmentFragmentDoc = gql`
    fragment ErrorFragment on ErrorResponse {
  field
  message
}
    `;
export const PostArchiveFragmentFragmentDoc = gql`
    fragment PostArchiveFragment on PostArchive {
  _id
  postId
  user
  isEdited
  text
  textSnippet
  picture
  video
  file
  link
  ytvideo
  feeling
  tags
  mentions
  location
  reacts
  comments
  shares
  isShared
  originalPost
  saves
  reports
  createdAt
  updatedAt
}
    `;
export const PostFragmentFragmentDoc = gql`
    fragment PostFragment on Post {
  _id
  user
  isEdited
  text
  textSnippet
  picture
  video
  file
  link
  ytvideo
  feeling
  tags
  mentions
  location
  reacts
  comments
  shares
  isShared
  originalPost
  saves
  reports
  createdAt
  updatedAt
}
    `;
export const UserFragmentFragmentDoc = gql`
    fragment UserFragment on User {
  _id
  firstName
  middleName
  lastName
  fullName
  username
  nickname
  gender
  phone
  email
  isAdmin
  isVerified
  isSeller
  profile
  cover
  bio
  online
  birthday
  city
  hometown
  relationship
  languages
  tags
  socials
  website
  following
  followers
  createdAt
  updatedAt
}
    `;
export const CreatePostDocument = gql`
    mutation CreatePost($user: String!, $text: String, $link: String, $ytvideo: String, $location: String, $isMedia: Boolean!, $file: Upload) {
  createPost(
    input: {user: $user, text: $text, link: $link, ytvideo: $ytvideo, location: $location}
    isMedia: $isMedia
    file: $file
  ) {
    errors {
      ...ErrorFragment
    }
    post {
      userObj {
        ...UserFragment
      }
      ...PostFragment
    }
  }
}
    ${ErrorFragmentFragmentDoc}
${UserFragmentFragmentDoc}
${PostFragmentFragmentDoc}`;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      user: // value for 'user'
 *      text: // value for 'text'
 *      link: // value for 'link'
 *      ytvideo: // value for 'ytvideo'
 *      location: // value for 'location'
 *      isMedia: // value for 'isMedia'
 *      file: // value for 'file'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const DeletePostDocument = gql`
    mutation DeletePost($userId: String!, $postId: String!) {
  deletePost(userId: $userId, postId: $postId) {
    errors {
      ...ErrorFragment
    }
    info
    deleted {
      ...PostArchiveFragment
    }
  }
}
    ${ErrorFragmentFragmentDoc}
${PostArchiveFragmentFragmentDoc}`;
export type DeletePostMutationFn = Apollo.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useDeletePostMutation(baseOptions?: Apollo.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, options);
      }
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    errors {
      ...ErrorFragment
    }
    user {
      ...UserFragment
      followersObj {
        ...UserFragment
      }
      followingObj {
        ...UserFragment
      }
      closeObj {
        ...UserFragment
      }
      likes
      saved
      highlights
      accessToken
    }
  }
}
    ${ErrorFragmentFragmentDoc}
${UserFragmentFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      usernameOrEmail: // value for 'usernameOrEmail'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($firstName: String!, $middleName: String, $lastName: String!, $fullName: String!, $username: String!, $gender: Int!, $email: String!, $password: String!, $birthday: String!) {
  register(
    input: {firstName: $firstName, middleName: $middleName, lastName: $lastName, fullName: $fullName, username: $username, gender: $gender, email: $email, password: $password, birthday: $birthday}
  ) {
    errors {
      ...ErrorFragment
    }
    user {
      ...UserFragment
      followersObj {
        ...UserFragment
      }
      followingObj {
        ...UserFragment
      }
      closeObj {
        ...UserFragment
      }
      likes
      saved
      highlights
      accessToken
    }
  }
}
    ${ErrorFragmentFragmentDoc}
${UserFragmentFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      firstName: // value for 'firstName'
 *      middleName: // value for 'middleName'
 *      lastName: // value for 'lastName'
 *      fullName: // value for 'fullName'
 *      username: // value for 'username'
 *      gender: // value for 'gender'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      birthday: // value for 'birthday'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const GetProfileDocument = gql`
    query GetProfile($username: String!) {
  getProfile(username: $username) {
    errors {
      ...ErrorFragment
    }
    user {
      ...UserFragment
      followersObj {
        ...UserFragment
      }
      followingObj {
        ...UserFragment
      }
      closeObj {
        ...UserFragment
      }
      likes
      saved
      highlights
    }
  }
}
    ${ErrorFragmentFragmentDoc}
${UserFragmentFragmentDoc}`;

/**
 * __useGetProfileQuery__
 *
 * To run a query within a React component, call `useGetProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProfileQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useGetProfileQuery(baseOptions: Apollo.QueryHookOptions<GetProfileQuery, GetProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProfileQuery, GetProfileQueryVariables>(GetProfileDocument, options);
      }
export function useGetProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProfileQuery, GetProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProfileQuery, GetProfileQueryVariables>(GetProfileDocument, options);
        }
export type GetProfileQueryHookResult = ReturnType<typeof useGetProfileQuery>;
export type GetProfileLazyQueryHookResult = ReturnType<typeof useGetProfileLazyQuery>;
export type GetProfileQueryResult = Apollo.QueryResult<GetProfileQuery, GetProfileQueryVariables>;
export const GetTimelinePostsDocument = gql`
    query GetTimelinePosts($userId: String!, $limit: Int!, $cursor: String) {
  getTimelinePosts(userId: $userId, limit: $limit, cursor: $cursor) {
    errors {
      ...ErrorFragment
    }
    posts {
      userObj {
        ...UserFragment
      }
      ...PostFragment
    }
    hasMore
  }
}
    ${ErrorFragmentFragmentDoc}
${UserFragmentFragmentDoc}
${PostFragmentFragmentDoc}`;

/**
 * __useGetTimelinePostsQuery__
 *
 * To run a query within a React component, call `useGetTimelinePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTimelinePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTimelinePostsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useGetTimelinePostsQuery(baseOptions: Apollo.QueryHookOptions<GetTimelinePostsQuery, GetTimelinePostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTimelinePostsQuery, GetTimelinePostsQueryVariables>(GetTimelinePostsDocument, options);
      }
export function useGetTimelinePostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTimelinePostsQuery, GetTimelinePostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTimelinePostsQuery, GetTimelinePostsQueryVariables>(GetTimelinePostsDocument, options);
        }
export type GetTimelinePostsQueryHookResult = ReturnType<typeof useGetTimelinePostsQuery>;
export type GetTimelinePostsLazyQueryHookResult = ReturnType<typeof useGetTimelinePostsLazyQuery>;
export type GetTimelinePostsQueryResult = Apollo.QueryResult<GetTimelinePostsQuery, GetTimelinePostsQueryVariables>;
export const GetUserDocument = gql`
    query GetUser($userId: String!) {
  getUser(userId: $userId) {
    errors {
      ...ErrorFragment
    }
    user {
      ...UserFragment
      followersObj {
        ...UserFragment
      }
      followingObj {
        ...UserFragment
      }
      closeObj {
        ...UserFragment
      }
      likes
      saved
      highlights
    }
  }
}
    ${ErrorFragmentFragmentDoc}
${UserFragmentFragmentDoc}`;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const GetUserPostsDocument = gql`
    query GetUserPosts($userId: String!, $limit: Int!, $cursor: String) {
  getUserPosts(userId: $userId, limit: $limit, cursor: $cursor) {
    errors {
      ...ErrorFragment
    }
    posts {
      userObj {
        ...UserFragment
      }
      ...PostFragment
    }
    hasMore
  }
}
    ${ErrorFragmentFragmentDoc}
${UserFragmentFragmentDoc}
${PostFragmentFragmentDoc}`;

/**
 * __useGetUserPostsQuery__
 *
 * To run a query within a React component, call `useGetUserPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserPostsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useGetUserPostsQuery(baseOptions: Apollo.QueryHookOptions<GetUserPostsQuery, GetUserPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserPostsQuery, GetUserPostsQueryVariables>(GetUserPostsDocument, options);
      }
export function useGetUserPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserPostsQuery, GetUserPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserPostsQuery, GetUserPostsQueryVariables>(GetUserPostsDocument, options);
        }
export type GetUserPostsQueryHookResult = ReturnType<typeof useGetUserPostsQuery>;
export type GetUserPostsLazyQueryHookResult = ReturnType<typeof useGetUserPostsLazyQuery>;
export type GetUserPostsQueryResult = Apollo.QueryResult<GetUserPostsQuery, GetUserPostsQueryVariables>;