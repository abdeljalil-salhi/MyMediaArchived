import { gql } from "@apollo/client";

export const MUTATION_UPDATE_USER = gql`
  mutation UpdateUser(
    $userId: String!
    $accessToken: String!
    $firstName: String
    $middleName: String
    $lastName: String
    $fullName: String
    $username: String
    $email: String
    $password: String
    $isAdmin: Boolean
    $isVerified: Boolean
    $isSeller: Boolean
    $profile: String
    $cover: String
    $bio: String
    $birthday: String
    $city: String
    $hometown: String
    $relationship: Int
    $website: String
  ) {
    updateUser(
      userId: $userId
      accessToken: $accessToken
      input: {
        firstName: $firstName
        middleName: $middleName
        lastName: $lastName
        fullName: $fullName
        username: $username
        email: $email
        password: $password
        isAdmin: $isAdmin
        isVerified: $isVerified
        isSeller: $isSeller
        profile: $profile
        cover: $cover
        bio: $bio
        birthday: $birthday
        city: $city
        hometown: $hometown
        relationship: $relationship
        website: $website
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
