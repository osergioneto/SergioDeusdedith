import { ApolloServer } from 'apollo-server';
import EsportesAPI from '../src/datasources/EsportesAPI';
import schema from "../src/schema";

export async function spawnBFFServer(port: number) {
  const server = new ApolloServer({
    schema,
    dataSources: () => {
      return {
        esportesAPI: new EsportesAPI()
      }
    },
  });
  await server.listen({ port: 4000 }, () => {
    console.log(`Server ready at http://localhost:${port}/graphql 🚀`)
  });

  return server;
}