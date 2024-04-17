const { gql } = require("graphql-tag");

const userTypeDefs = gql`
  type User {
    id: Int
    username: String!
    email: String!
    age: Int
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    getUser(id: Int! @constraint(max: 5)): User
    getUsers: [User]
  }

  type Mutation {
    createUser(
      username: String! @constraint(minLength: 5)
      email: String! @constraint(format: "email")
      age: Int
    ): User
    updateUser(id: ID!, username: String, email: String, age: Int): User
    deleteUser(id: ID!): User
  }
`;

module.exports = userTypeDefs;
