import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import EsportesAPI from "./datasources/EsportesAPI";
import schema from "./schema";

const server = new ApolloServer({
  schema,
  dataSources: () => {
    return {
      esportesAPI: new EsportesAPI()
    }
  },
});

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () => {
  console.log(`Server ready at http://localhost:4000/graphql 🚀`)
});