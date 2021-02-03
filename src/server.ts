import { ApolloServer, gql } from "apollo-server";
import EsportesAPI from "./data-sources/EsportesAPI";
import 'apollo-cache-control';
import responseCachePlugin from 'apollo-server-plugin-response-cache';
import schema from "./schema";

const server = new ApolloServer({
  schema,
  dataSources: () => {
    return {
      esportesAPI: new EsportesAPI()
    }
  },
  plugins: [responseCachePlugin()]
});

server.listen().then(({ url }: { url: string }) => {
  console.log(`🚀  Server ready at ${url}`);
});