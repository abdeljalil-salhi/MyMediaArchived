import { FC, useEffect, useContext, useState } from "react";
import { Twemoji } from "react-emoji-render";
import { Dispatch } from "redux";

import { useAppDispatch } from "../../store/hooks";
import { TConversation } from "../../store/types/conversationsTypes";
import { setCurrentConversation } from "../../store/slices/conversationsSlice";
import { GetUserConversations_getUserConversations_conversations_membersObj } from "../../generated/types/GetUserConversations";
import { AuthContext } from "../../context/auth.context";
import { isEmpty } from "../../utils/isEmpty";
import { PU, TRANSPARENT } from "../../globals";
import { directParser } from "../../utils/parsers";

interface ConversationItemProps {
  conversation: TConversation;
}

const actionDispatch = (dispatch: Dispatch) => ({
  setCurrentConversation: (conversation: TConversation) =>
    dispatch(setCurrentConversation(conversation)),
});

export const ConversationItem: FC<ConversationItemProps> = ({
  conversation,
}) => {
  const [otherMember, setOtherMember] =
    useState<GetUserConversations_getUserConversations_conversations_membersObj>(
      {} as GetUserConversations_getUserConversations_conversations_membersObj
    );
  const [lastMessagePreview, setLastMessagePreview] = useState<string>("");
  const [isSeen, setIsSeen] = useState<boolean>(false);

  // The selector to get user informations from the context (ContextAPI)
  const { user } = useContext(AuthContext);

  // The dispatch function to update the conversations state in the store (Redux)
  const { setCurrentConversation } = actionDispatch(useAppDispatch());

  useEffect(() => {
    // Get the current conversation's other member
    const member = conversation.membersObj!.find(
      (
        member: GetUserConversations_getUserConversations_conversations_membersObj
      ) => member._id !== user._id
    );
    setOtherMember(member!);

    // Get the type of the last message sent
    conversation.lastMessageObj?.text
      ? setLastMessagePreview(conversation.lastMessageObj.text)
      : conversation.lastMessageObj?.picture
      ? setLastMessagePreview("sent a picture.")
      : conversation.lastMessageObj?.video
      ? setLastMessagePreview("sent a video.")
      : conversation.lastMessageObj?.audio
      ? setLastMessagePreview("sent an audio.")
      : conversation.lastMessageObj?.GIF
      ? setLastMessagePreview("sent a GIF.")
      : conversation.lastMessageObj?.profile
      ? setLastMessagePreview("sent a profile.")
      : conversation.lastMessageObj?.file
      ? setLastMessagePreview("sent a file.")
      : conversation.lastMessageObj?.link
      ? setLastMessagePreview("sent a link.")
      : conversation.lastMessageObj?.sticker
      ? setLastMessagePreview("sent a sticker.")
      : conversation.lastMessageObj?.ytvideo
      ? setLastMessagePreview("sent a YouTube video.")
      : setLastMessagePreview("sent a message.");

    // Get if the last message is already seen
    conversation.lastSenderObj._id === user._id
      ? setIsSeen(true)
      : conversation.lastMessageObj?.seenBy.includes(user._id) &&
        setIsSeen(true);
  }, [conversation, user]);

  if (isEmpty(otherMember)) return null;

  return (
    <div
      className="c-conversation-item"
      onClick={() => setCurrentConversation(conversation)}
    >
      <img
        src={
          otherMember && otherMember.profile
            ? `${PU}${otherMember.profile}`
            : TRANSPARENT
        }
        className="c-conversation-item__avatar avatar skeleton"
        alt={otherMember ? otherMember.fullName : ""}
        draggable={false}
      />
      <span className="c-conversation-item__body">
        {otherMember.fullName ? (
          <div className="c-conversation-item__body-name">
            {otherMember.fullName}
          </div>
        ) : (
          <div className="skeleton skeleton-text"></div>
        )}
        <div className="c-conversation-item__body-message">
          <p className="c-conversation-item__body-message-text">
            <Twemoji
              text={
                conversation.lastSenderObj._id === user._id
                  ? `You${
                      conversation.lastMessageObj?.text && ":"
                    } ${lastMessagePreview}`
                  : `${lastMessagePreview}`
              }
              className={
                !isSeen ? "c-conversation-item__body-message-text-notseen" : ""
              }
            />
          </p>
          <span className="c-conversation-item__body-message-time">
            {" - "}
            {directParser(conversation.timestamp)}
          </span>
        </div>
      </span>
      {!isSeen && <div className="c-conversation-item__notseen"></div>}
    </div>
  );
};
