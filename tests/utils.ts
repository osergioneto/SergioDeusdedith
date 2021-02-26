import express from "express";
import { ApolloServer } from 'apollo-server-express';
require("dotenv").config();
import EsportesAPI from '../src/datasources/EsportesAPI';
import schema from "../src/schema";
import Redis from "ioredis";

const redis = new Redis({ host: process.env.REDIS_HOST });

export async function spawnBFFServer(port: number = 4000) {
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

  app.listen({ port }, () => {
    console.log(`Server ready at ${process.env.APP_URL}:${process.env.PORT}/graphql 🚀`)
  });

  return server;
}