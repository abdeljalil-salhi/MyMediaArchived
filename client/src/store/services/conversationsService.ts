import { FetchResult } from "@apollo/client";

import { client } from "../..";
import { isEmpty } from "../../utils/isEmpty";
import { GraphQLAccessToken } from "../../utils/_graphql";

import {
  GetUserConversations,
  GetUserConversationsVariables,
} from "../../generated/types/GetUserConversations";
import {
  CreateConversation,
  CreateConversationVariables,
} from "../../generated/types/CreateConversation";

import { QUERY_GET_USER_CONVERSATIONS } from "../../graphql/queries/getUserConversations";
import { MUTATION_CREATE_CONVERSATION } from "../../graphql/mutations/createConversation";

class conversationsService {
  async getUserConversations(
    variables: GetUserConversationsVariables,
    accessToken: string
  ): Promise<GetUserConversations["getUserConversations"]> {
    try {
      // Send the GraphQL query to the server
      const res: FetchResult<
        any,
        Record<string, any>,
        Record<string, any>
      > = await client.query({
        query: QUERY_GET_USER_CONVERSATIONS,
        variables,
        // Pass the access token to the GraphQL context
        context: GraphQLAccessToken(accessToken),
      });

      // Handle known errors from the server and throw them as errors to the caller
      if (isEmpty(res) || isEmpty(res.data)) throw new Error("No data");

      // If the request was successful, return the value of the conversations
      return res.data.getUserConversations;
    } catch (err: unknown) {
      // Handle unknown errors from the server and throw them to the caller
      throw new Error(
        "Error in conversationsService.getUserConversations: " + err
      );
    }
  }

  async createConversation(
    variables: CreateConversationVariables,
    accessToken: string
  ): Promise<CreateConversation["createConversation"]> {
    try {
      // Send the GraphQL query to the server
      const res: FetchResult<
        any,
        Record<string, any>,
        Record<string, any>
      > = await client.mutate({
        mutation: MUTATION_CREATE_CONVERSATION,
        variables,
        // Pass the access token to the GraphQL context
        context: GraphQLAccessToken(accessToken),
      });

      // Handle known errors from the server and throw them as errors to the caller
      if (isEmpty(res) || isEmpty(res.data)) throw new Error("No data");

      // If the request was successful, return the value of the conversations
      return res.data.createConversation;
    } catch (err: unknown) {
      // Handle unknown errors from the server and throw them to the caller
      throw new Error(
        "Error in conversationsService.createConversation: " + err
      );
    }
  }
}

export default new conversationsService();
