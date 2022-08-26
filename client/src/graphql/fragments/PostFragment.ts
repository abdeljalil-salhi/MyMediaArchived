import { gql } from "@apollo/client";

export const FRAGMENT_POST = gql`
  fragment PostFragment on Post {
    _id
    isEdited
    text
    textSnippet
    picture
    video
    file
    link
    ytvideo
    tags
    location
    isShared
    reacts
    comments
    mentions
    shares
    saves
    reports
    createdAt
    updatedAt
  }
`;
