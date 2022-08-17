import { GraphQLScalarType } from "graphql";

export const myDateType = new GraphQLScalarType({
    name: 'MyDate',
    description: 'My custom date scalar',
    parseValue(value) {
      console.log("Parse", value)
      return value;
    },
    serialize(value) {
      console.log("Serialize", value)
      return new Date(Number(value));
    },
    parseLiteral(ast) {
      console.log("Parse literal", ast)
      if (ast.kind === "IntValue") {
        return new Date(ast.value);
      }
      if (ast.kind === "StringValue") {
        return new Date(ast.value);
      }
      return null;
    }
});
