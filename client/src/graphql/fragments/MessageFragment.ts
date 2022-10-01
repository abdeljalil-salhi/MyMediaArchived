import { gql } from "@apollo/client";

export const FRAGMENT_MESSAGE = gql`
  fragment MessageFragment on Message {
    _id
    conversations
    sender
    text
    textSnippet
    picture
    video
    audio
    file
    link
    ytvideo
    location
    GIF
    sticker
    profile
    isRemoved
    deletedBy
    seenBy
    reacts
    createdAt
    updatedAt
  }
`;
