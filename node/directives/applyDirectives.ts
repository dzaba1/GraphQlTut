import { GraphQLSchema } from "graphql";

export type DirectiveHandler = (schema: GraphQLSchema) => GraphQLSchema; 

const handlers: DirectiveHandler[] = [
];

export function applyDirectives(schema: GraphQLSchema): GraphQLSchema {
    let fixed = schema;

    for (const handler of handlers) {
        fixed = handler(fixed);
    }

    return fixed;
}