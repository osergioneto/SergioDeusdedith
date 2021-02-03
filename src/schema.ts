import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import { makeExecutableSchema } from "@graphql-tools/schema";
import path from "path";

const resolversArray = loadFilesSync(path.join(__dirname, "resolvers"), { recursive: true, extensions: ["js", "ts"] });
const typesArray = loadFilesSync(path.join(__dirname, "types"), { recursive: true, extensions: ["gql"] });
const resolvers = mergeResolvers(resolversArray);
const typeDefs = mergeTypeDefs(typesArray);
const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;