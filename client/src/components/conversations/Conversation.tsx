import { FC } from "react";
import { createSelector } from "@reduxjs/toolkit";

import { makeSelectConversations } from "../../store/selectors/conversationsSelector";
import { IConversationsState } from "../../store/types/conversationsTypes";
import { useAppSelector } from "../../store/hooks";

interface ConversationProps {}

const conversationsStateSelector = createSelector(
  makeSelectConversations,
  (conversations: IConversationsState["data"]) => ({
    currentConversation: conversations.currentConversation,
  })
);

export const Conversation: FC<ConversationProps> = () => {
  // The selector to get state informations from the store (Redux)
  const { currentConversation } = useAppSelector(conversationsStateSelector);

  return (
    <div className="c-conversation">
      {currentConversation ? (
        <>ID of the conversation: {currentConversation._id}</>
      ) : (
        <span className="c-conversation__none">
          Open a conversation to start a chat.
        </span>
      )}
    </div>
  );
};
