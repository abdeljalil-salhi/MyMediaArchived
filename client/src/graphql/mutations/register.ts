import { gql } from "@apollo/client";

export const MUTATION_REGISTER = gql`
  mutation Register(
    $firstName: String!
    $middleName: String
    $lastName: String!
    $fullName: String!
    $username: String!
    $gender: Int!
    $email: String!
    $password: String!
    $birthday: String!
  ) {
    register(
      input: {
        firstName: $firstName
        middleName: $middleName
        lastName: $lastName
        fullName: $fullName
        username: $username
        gender: $gender
        email: $email
        password: $password
        birthday: $birthday
      }
    ) {
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
        accessToken
      }
    }
  }
`;
