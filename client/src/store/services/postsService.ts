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

import { QUERY_GET_TIMELINE_POSTS } from "../../graphql/queries/getTimelinePosts";
import { QUERY_GET_USER_POSTS } from "../../graphql/queries/getUserPosts";

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
}

export default new postsService();
