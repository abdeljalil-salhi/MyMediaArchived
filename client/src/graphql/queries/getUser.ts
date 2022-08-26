import { gql } from "@apollo/client";

export const QUERY_GET_USER = gql`
  query GetUser($userId: String!) {
    getUser(userId: $userId) {
      errors {
        ...ErrorFragment
      }
      user {
        ...UserFragment
        followersObj {
          ...UserFragment
        }
        followingObj {
          ...UserFragment
        }
        closeObj {
          ...UserFragment
        }
        likes
        saved
        highlights
      }
    }
  }
`;
