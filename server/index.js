import { ApolloServer, gql } from 'apollo-server-micro';
import * as resolvers from '@/server/resolvers';

const typeDefs = gql`
  type Community {
    id: Int!
    name: String!
    description: String!
    icon: String!
    members: [User!]!
    posts: [Post!]!
  }

  type User {
    id: Int!
    name: String!
    bio: String!
    profile_photo: String!
    communities: [Community!]!
    posts: [Post!]!
  }

  type Post {
    id: Int!
    text: String!
    user: User!
    user_id: String!
  }

  type Query {
    community(id: Int!): Community!
    user(id: Int!): User!
  }
`;

export const server = new ApolloServer({ typeDefs, resolvers });
