const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const {
  createApollo4QueryValidationPlugin,
  constraintDirectiveTypeDefs,
} = require("graphql-constraint-directive/apollo4");

const { makeExecutableSchema } = require("@graphql-tools/schema");

const userTypeDefs = require("./graphql/typedefs");
const userResolvers = require("./graphql/resolvers");

async function graphqlServer() {
  const app = express();

  const apolloServer = new ApolloServer({
    typeDefs: makeExecutableSchema({
      typeDefs: [constraintDirectiveTypeDefs, userTypeDefs],
    }),
    resolvers: userResolvers,
    introspection: true,
    plugins: [createApollo4QueryValidationPlugin()],
  });

  await apolloServer.start();

  app.use("/api/graphql", express.json(), expressMiddleware(apolloServer));

  app.listen(3000, () => {
    console.log(`GraphQL server running at http://localhost:3000/api/graphql`);
  });
}

graphqlServer();
