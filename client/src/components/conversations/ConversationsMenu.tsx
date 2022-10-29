import { FC } from "react";
import { Search } from "@mui/icons-material";
import { createSelector } from "@reduxjs/toolkit";

import {
  IConversationsState,
  TConversation,
} from "../../store/types/conversationsTypes";
import { makeSelectConversations } from "../../store/selectors/conversationsSelector";
import { useAppSelector } from "../../store/hooks";
import { ConversationItem } from "./ConversationItem";

interface ConversationsMenuProps {}

const conversationsStateSelector = createSelector(
  makeSelectConversations,
  (conversations: IConversationsState["data"]) => ({
    allConversations: conversations.allConversations,
  })
);

export const ConversationsMenu: FC<ConversationsMenuProps> = () => {
  // The selector to get state informations from the store (Redux)
  const { allConversations } = useAppSelector(conversationsStateSelector);

  return (
    <div className="c-conversations-menu">
      <div className="c-conversations-menu__header">
        <h3 className="c-conversations-menu__header__title">Conversations</h3>
        <div className="c-conversations-menu__header__search">
          <Search />
          <input
            type="text"
            placeholder="Search for a friend..."
            autoComplete="off"
          />
        </div>
      </div>
      {!allConversations.conversations ||
      allConversations.conversations.length === 0 ? (
        <div className="c-conversations-menu__no-conversations">
          No conversations yet.
        </div>
      ) : (
        <div className="c-conversations-menu__conversations">
          {allConversations.conversations
            .sort(
              (c1: TConversation, c2: TConversation) =>
                new Date(c2.timestamp).valueOf() -
                new Date(c1.timestamp).valueOf()
            )
            .map((conversation: TConversation, index: number) => (
              <ConversationItem key={index} conversation={conversation} />
            ))}
        </div>
      )}
    </div>
  );
};
