import { FC, useContext, useEffect, useState } from "react";
import { Dispatch } from "redux";
import { createSelector } from "@reduxjs/toolkit";

import { Topbar } from "../components/topbar/Topbar";
import { ConversationsMenu } from "../components/conversations/ConversationsMenu";
import { Conversation } from "../components/conversations/Conversation";
import { ConversationDetails } from "../components/conversations/ConversationDetails";
import {
  IConversationsState,
  TConversations,
} from "../store/types/conversationsTypes";
import { AuthContext } from "../context/auth.context";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { SocketContext } from "../context/socket.context";
import { setAllConversations } from "../store/slices/conversationsSlice";
import {
  GetUserConversationsVariables,
  GetUserConversations_getUserConversations,
  GetUserConversations_getUserConversations_conversations,
} from "../generated/types/GetUserConversations";
import conversationsService from "../store/services/conversationsService";
import { isEmpty } from "../utils/isEmpty";
import { makeSelectConversations } from "../store/selectors/conversationsSelector";
import { PaginatedConversations } from "../store/typenames";

interface DirectProps {}

const conversationsStateSelector = createSelector(
  makeSelectConversations,
  (conversations: IConversationsState["data"]) => ({
    allConversations: conversations.allConversations,
  })
);

const actionDispatch = (dispatch: Dispatch) => ({
  setAllConversations: (conversations: TConversations) =>
    dispatch(setAllConversations(conversations)),
});

export const Direct: FC<DirectProps> = () => {
  const [loadConversations, setLoadConversations] = useState<boolean>(true);
  const [firstQuery, setFirstQuery] = useState<boolean>(true);

  // The states below are used by the getUserConversations() GraphQL query
  const [getUserConversationsLoading, setUserConversationsLoading] =
    useState<boolean>(false);
  const [getUserConversationsError, setUserConversationsError] =
    useState<boolean>(false);

  // The selector to get user informations from the context (ContextAPI)
  const { user } = useContext(AuthContext);
  // The selector to get the online users from the context (ContextAPI)
  const { users } = useContext(SocketContext);

  // The selector to get state informations from the store (Redux)
  const { allConversations } = useAppSelector(conversationsStateSelector);

  // The dispatch function to update the conversations state in the store (Redux)
  const { setAllConversations } = actionDispatch(useAppDispatch());

  // The useEffect hook below is used to change the document title
  useEffect(() => {
    document.title = "MyMedia - Inbox";
  }, []);

  useEffect(() => {
    const fetchConversations = async () => {
      // Start the querying process by turning the loading state to true
      setUserConversationsLoading(true);
      // Prepare the variables to be sent in the GraphQL query
      const variables: GetUserConversationsVariables = {
        userId: user._id,
        limit: 10,
        cursor: firstQuery
          ? null
          : allConversations &&
            allConversations.conversations &&
            allConversations.conversations[
              allConversations.conversations.length - 1
            ].timestamp,
      };
      try {
        // Send the GraphQL getUserConversations request to the server
        const res: GetUserConversations_getUserConversations =
          (await conversationsService
            .getUserConversations(variables, user.accessToken)
            .catch((_: unknown) =>
              setUserConversationsError(false)
            )) as GetUserConversations_getUserConversations;

        // If the request is successful, update the state with the response data
        if (!isEmpty(res.conversations)) {
          setAllConversations(
            firstQuery
              ? res
              : {
                  __typename: PaginatedConversations,
                  errors: res.errors,
                  conversations: [
                    ...((
                      allConversations as GetUserConversations_getUserConversations
                    )
                      .conversations as GetUserConversations_getUserConversations_conversations[]),
                    ...((res as GetUserConversations_getUserConversations)
                      .conversations as GetUserConversations_getUserConversations_conversations[]),
                  ],
                  hasMore: res.hasMore,
                }
          );
        } else if (!isEmpty(res.errors)) {
          // If the request is not successful, update the state with the response errors
          setUserConversationsError(true);
        }
      } catch (_: unknown) {
        // If an error occurs, turn the error state to true
        setUserConversationsError(true);
      }
      // End the querying process by turning the loading state to false
      setUserConversationsLoading(false);
    };
    fetchConversations();
  }, [setAllConversations, user]);

  return (
    <>
      <Topbar />
      <div className="p-direct">
        <ConversationsMenu />
        <div className="p-direct__conversation">
          <Conversation />
        </div>
        <div className="p-direct__details">
          <ConversationDetails />
        </div>
      </div>
    </>
  );
};
