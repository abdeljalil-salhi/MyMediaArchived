import { gql } from "@apollo/client";

export const FRAGMENT_USER = gql`
  fragment UserFragment on User {
    _id
    firstName
    middleName
    lastName
    fullName
    username
    nickname
    gender
    phone
    email
    isAdmin
    isVerified
    isSeller
    profile
    cover
    bio
    online
    birthday
    city
    hometown
    relationship
    languages
    tags
    socials
    website
    createdAt
    updatedAt
  }
`;
