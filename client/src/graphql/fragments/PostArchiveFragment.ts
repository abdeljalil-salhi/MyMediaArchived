import { gql } from "@apollo/client";

export const FRAGMENT_POST_ARCHIVE = gql`
  fragment PostArchiveFragment on PostArchive {
    _id
    postId
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
