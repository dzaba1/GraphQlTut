import { IResolvers } from "@graphql-tools/utils";
import { myDateType } from "../types/myDate";
import { Mutation } from "./mutation";
import { Query } from "./query";

export const resolvers: IResolvers = {
  Query,
  Mutation,
  MyDate: myDateType
};
