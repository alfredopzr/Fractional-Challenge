import { ApolloServer, gql } from 'apollo-server-micro';
import * as resolvers from '@/server/resolvers';

const typeDefs = gql`
  type Community {
    id: Int!
    name: String!
    description: String!
    icon: String!
    members: [User!]!
    posts(offset: Int, limit: Int): [Post!]
  }

  type User {
    id: Int!
    name: String!
    bio: String!
    profile_photo: String!
    communities: [Community!]!
    posts(offset: Int, limit: Int): [Post!]!
  }

  type Post {
    id: Int
    text: String!
    user: User!
    user_id: String!
    name: String!
    profile_photo: String!
    source_id: Int
  }

  type Query {
    community(id: Int!): Community!
    user(id: Int!): User!
    post(id: Int!): Post!
    posts(offset: Int, limit: Int): [Post!]!
  }

  input AddPostInput {
    id: Int
    text: String!
    user_id: String!
    source_id: Int
  }

  input DeletePostInput {
    id: Int!
  }

  type Mutation {
    addPost(input: AddPostInput!): Post
    deletePost(input: DeletePostInput!): Post
  }


`;

export const server = new ApolloServer({ typeDefs, resolvers });
