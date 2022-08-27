import { myDateType } from "../types/myDate";
import { DependenciesFacade } from "./dependenciesFacade";
import { Mutation } from "./mutation";
import { Query } from "./query";

export class Resolvers {
  constructor(private dependencies: DependenciesFacade) {

  }

  public Query = new Query(this.dependencies);

  public Mutation = Mutation;

  public MyDate = myDateType;
}