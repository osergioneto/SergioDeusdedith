import { ApolloServer, gql } from "apollo-server";
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

server.listen().then(({ url }: { url: string }) => {
  console.log(`🚀  Server ready at ${url}`);
});