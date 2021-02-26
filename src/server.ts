import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
require("dotenv").config();
import EsportesAPI from "./datasources/EsportesAPI";
import schema from "./schema";
import Redis from "ioredis";

const redis = new Redis({ host: process.env.REDIS_HOST });

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
  console.log(`Server ready at ${process.env.APP_URL}:${process.env.PORT}/graphql 🚀`)
});