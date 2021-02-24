import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
require("dotenv").config();
import EsportesAPI from "./datasources/EsportesAPI";
import schema from "./schema";
import Redis from "ioredis";

const redis = new Redis();

const server = new ApolloServer({
  schema,
  dataSources: () => {
    return {
      esportesAPI: new EsportesAPI(redis)
    }
  },
});

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () => {
  console.log(`Server ready at http://localhost:4000/graphql 🚀`)
});