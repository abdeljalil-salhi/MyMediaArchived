import { FetchResult } from "@apollo/client";

import { client } from "../..";
import { isEmpty } from "../../utils/isEmpty";
import { GraphQLAccessToken } from "../../utils/_graphql";

import {
  GetTimelinePosts,
  GetTimelinePostsVariables,
} from "../../generated/types/GetTimelinePosts";
import {
  GetUserPosts,
  GetUserPostsVariables,
} from "../../generated/types/GetUserPosts";
import {
  CreatePost,
  CreatePostVariables,
} from "../../generated/types/CreatePost";
import {
  DeletePost,
  DeletePostVariables,
} from "../../generated/types/DeletePost";
import {
  UpdatePost,
  UpdatePostVariables,
} from "../../generated/types/UpdatePost";
import { ReactPost, ReactPostVariables } from "../../generated/types/ReactPost";
import {
  UnreactPostVariables,
  UnreactPost,
} from "../../generated/types/UnreactPost";

import { QUERY_GET_TIMELINE_POSTS } from "../../graphql/queries/getTimelinePosts";
import { QUERY_GET_USER_POSTS } from "../../graphql/queries/getUserPosts";
import { MUTATION_CREATE_POST } from "../../graphql/mutations/createPost";
import { MUTATION_DELETE_POST } from "../../graphql/mutations/deletePost";
import { MUTATION_UPDATE_POST } from "../../graphql/mutations/updatePost";
import { MUTATION_REACT_POST } from "../../graphql/mutations/reactPost";
import { MUTATION_UNREACT_POST } from "../../graphql/mutations/unreactPost";

class postsService {
  async getTimelinePosts(
    variables: GetTimelinePostsVariables,
    accessToken: string
  ): Promise<GetTimelinePosts["getTimelinePosts"]> {
    try {
      // Send the GraphQL query to the server
      const res: FetchResult<
        any,
        Record<string, any>,
        Record<string, any>
      > = await client.query({
        query: QUERY_GET_TIMELINE_POSTS,
        variables,
        // Pass the access token to the GraphQL context
        context: GraphQLAccessToken(accessToken),
      });

      // Handle known errors from the server and throw them as errors to the caller
      if (isEmpty(res) || isEmpty(res.data)) throw new Error("No data");

      // If the request was successful, return the value of the posts
      return res.data.getTimelinePosts;
    } catch (err: unknown) {
      // Handle unknown errors from the server and throw them to the caller
      throw new Error("Error in postsService.getTimelinePosts: " + err);
    }
  }

  async getUserPosts(
    variables: GetUserPostsVariables,
    accessToken: string
  ): Promise<GetUserPosts["getUserPosts"]> {
    try {
      // Send the GraphQL query to the server
      const res: FetchResult<
        any,
        Record<string, any>,
        Record<string, any>
      > = await client.query({
        query: QUERY_GET_USER_POSTS,
        variables,
        // Pass the access token to the GraphQL context
        context: GraphQLAccessToken(accessToken),
      });

      // Handle known errors from the server and throw them as errors to the caller
      if (isEmpty(res) || isEmpty(res.data)) throw new Error("No data");

      // If the request was successful, return the value of the posts
      return res.data.getUserPosts;
    } catch (err: unknown) {
      // Handle unknown errors from the server and throw them to the caller
      throw new Error("Error in postsService.getUserPosts: " + err);
    }
  }

  async createPost(
    variables: CreatePostVariables,
    accessToken: string
  ): Promise<CreatePost["createPost"]> {
    try {
      // Send the GraphQL mutation to the server
      const res: FetchResult<
        any,
        Record<string, any>,
        Record<string, any>
      > = await client.mutate({
        mutation: MUTATION_CREATE_POST,
        variables,
        // Pass the access token to the GraphQL context
        context: GraphQLAccessToken(accessToken),
      });

      // Handle known errors from the server and throw them as errors to the caller
      if (isEmpty(res) || isEmpty(res.data)) throw new Error("No data");

      // If the request was successful, return the value of the posts
      return res.data.createPost;
    } catch (err: unknown) {
      // Handle unknown errors from the server and throw them to the caller
      throw new Error("Error in postsService.createPost: " + err);
    }
  }

  async deletePost(
    variables: DeletePostVariables,
    accessToken: string
  ): Promise<DeletePost["deletePost"]> {
    try {
      // Send the GraphQL mutation to the server
      const res: FetchResult<
        any,
        Record<string, any>,
        Record<string, any>
      > = await client.mutate({
        mutation: MUTATION_DELETE_POST,
        variables,
        // Pass the access token to the GraphQL context
        context: GraphQLAccessToken(accessToken),
      });

      // Handle known errors from the server and throw them as errors to the caller
      if (isEmpty(res) || isEmpty(res.data)) throw new Error("No data");

      // If the request was successful, return the value of the posts
      return res.data.deletePost;
    } catch (err: unknown) {
      // Handle unknown errors from the server and throw them to the caller
      throw new Error("Error in postsService.deletePost: " + err);
    }
  }

  async updatePost(
    variables: UpdatePostVariables,
    accessToken: string
  ): Promise<UpdatePost["updatePost"]> {
    try {
      // Send the GraphQL mutation to the server
      const res: FetchResult<
        any,
        Record<string, any>,
        Record<string, any>
      > = await client.mutate({
        mutation: MUTATION_UPDATE_POST,
        variables,
        // Pass the access token to the GraphQL context
        context: GraphQLAccessToken(accessToken),
      });

      // Handle known errors from the server and throw them as errors to the caller
      if (isEmpty(res) || isEmpty(res.data)) throw new Error("No data");

      // If the request was successful, return the value of the posts
      return res.data.updatePost;
    } catch (err: unknown) {
      // Handle unknown errors from the server and throw them to the caller
      throw new Error("Error in postsService.updatePost: " + err);
    }
  }

  async reactPost(
    variables: ReactPostVariables,
    accessToken: string
  ): Promise<ReactPost["reactPost"]> {
    try {
      // Send the GraphQL mutation to the server
      const res: FetchResult<
        any,
        Record<string, any>,
        Record<string, any>
      > = await client.mutate({
        mutation: MUTATION_REACT_POST,
        variables,
        // Pass the access token to the GraphQL context
        context: GraphQLAccessToken(accessToken),
      });

      // Handle known errors from the server and throw them as errors to the caller
      if (isEmpty(res) || isEmpty(res.data)) throw new Error("No data");

      // If the request was successful, return the value of the posts
      return res.data.reactPost;
    } catch (err: unknown) {
      // Handle unknown errors from the server and throw them to the caller
      throw new Error("Error in postsService.reactPost: " + err);
    }
  }

  async unreactPost(
    variables: UnreactPostVariables,
    accessToken: string
  ): Promise<UnreactPost["unreactPost"]> {
    try {
      // Send the GraphQL mutation to the server
      const res: FetchResult<
        any,
        Record<string, any>,
        Record<string, any>
      > = await client.mutate({
        mutation: MUTATION_UNREACT_POST,
        variables,
        // Pass the access token to the GraphQL context
        context: GraphQLAccessToken(accessToken),
      });

      // Handle known errors from the server and throw them as errors to the caller
      if (isEmpty(res) || isEmpty(res.data)) throw new Error("No data");

      // If the request was successful, return the value of the posts
      return res.data.unreactPost;
    } catch (err: unknown) {
      // Handle unknown errors from the server and throw them to the caller
      throw new Error("Error in postsService.unreactPost: " + err);
    }
  }
}

export default new postsService();
