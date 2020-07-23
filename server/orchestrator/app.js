const { ApolloServer, gql, makeExecutableSchema } = require("apollo-server");
const moviesSchema = require("./schemas/moviesSchema");
const tvSeriesSchema = require("./schemas/tvSeriesSchema");
const entertainMe = require("./schemas/entertainMeSchema");

const typeDefs = gql`
  type Query
  type Mutation
`;

const schema = makeExecutableSchema({
  typeDefs: [
    typeDefs,
    moviesSchema.typeDefs,
    tvSeriesSchema.typeDefs,
    entertainMe.typeDefs,
  ],
  resolvers: [
    moviesSchema.resolvers,
    tvSeriesSchema.resolvers,
    entertainMe.resolvers,
  ],
});

const server = new ApolloServer({ schema });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
