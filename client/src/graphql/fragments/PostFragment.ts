import { gql } from "@apollo/client";

export const FRAGMENT_POST = gql`
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
