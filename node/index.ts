import express from "express";
import { graphqlHTTP } from "express-graphql";
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { loadSchema } from '@graphql-tools/load';
import { addResolversToSchema } from '@graphql-tools/schema';
import { GraphQLSchema } from 'graphql';
import { applyDirectives } from './directives/applyDirectives';
import { Resolvers, } from './resolvers/resolvers';
import { RuleGroupsDal, RuleUsersDal } from "./dal/rulesDal";
import { UsersDal } from "./dal/usersDal";
import { OperationsDal } from "./dal/operationsDal";
import { GroupsDal } from "./dal/groupsDal";
import { GroupLinksDal, UserGroupLinksDal } from "./dal/groupLinksDal";
import { DependenciesFacade } from "./resolvers/dependenciesFacade";
import { PermissionCalculator } from "./services/permissionCalculator";

async function buildSchema(): Promise<GraphQLSchema> {
  // Load schema from the file
  const schema = await loadSchema('./schemas/**/*.graphql', {
    loaders: [new GraphQLFileLoader()]
  });

  const resolversObj = initResolvers();
  const resolvers = { ...resolversObj }

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

function initResolvers(): Resolvers {
  const groupsDal = new GroupsDal();
  const usersDal = new UsersDal();
  const ruleGroupsDal = new RuleGroupsDal();
  const operationsDal = new OperationsDal();
  const ruleUsersDal = new RuleUsersDal();
  const groupLinksDal = new GroupLinksDal(groupsDal);
  const userGroupLinksDal = new UserGroupLinksDal(usersDal, groupsDal);
  const permissionCalculator = new PermissionCalculator(userGroupLinksDal, ruleGroupsDal, groupLinksDal, operationsDal, ruleUsersDal)
  const deps = new DependenciesFacade(ruleGroupsDal, ruleUsersDal, usersDal, operationsDal, groupsDal, groupLinksDal, userGroupLinksDal, permissionCalculator)
  return new Resolvers(deps);
}

await run();