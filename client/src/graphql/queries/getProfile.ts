import { gql } from "@apollo/client";

export const QUERY_GET_PROFILE = gql`
  query GetProfile($username: String!) {
    getProfile(username: $username) {
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
