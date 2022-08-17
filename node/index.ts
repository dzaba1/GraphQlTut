import express from "express";
import { graphqlHTTP } from "express-graphql";
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { loadSchema } from '@graphql-tools/load';
import { addResolversToSchema } from '@graphql-tools/schema';
import { GraphQLSchema } from 'graphql';
import { applyDirectives } from './directives/applyDirectives';
import { resolvers } from './resolvers/resolvers';

async function buildSchema(): Promise<GraphQLSchema> {
  // Load schema from the file
  const schema = await loadSchema('./schemas/**/*.graphql', {
    loaders: [new GraphQLFileLoader()]
  });

  const schemaWithResolvers = addResolversToSchema({
    schema,
    resolvers
  });
  const schemaWithResolversAndDirectives = applyDirectives(schemaWithResolvers);

  return schemaWithResolversAndDirectives
}

function startServer(schema: GraphQLSchema) {
  var app = express();
  app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
  }));
  app.listen(4000);
  console.log('Running a GraphQL API server at http://localhost:4000/graphql');
}

async function run(): Promise<void> {
  const schema = await buildSchema();

  startServer(schema);
}

await run();