import { GroupsDal } from "../dal/groupsDal";
import { OperationsDal } from "../dal/operationsDal";
import { RuleGroupsDal, RuleUsersDal } from "../dal/rulesDal";
import { UsersDal } from "../dal/usersDal";
import { myDateType } from "../types/myDate";
import { Mutation } from "./mutation";
import { Query } from "./query";

export class Resolvers {
  constructor(private ruleGroupsDal: RuleGroupsDal,
    private ruleUsersDal: RuleUsersDal,
    private usersDal: UsersDal,
    private operationsDal: OperationsDal,
    private groupsDal: GroupsDal) {

  }

  public Query = new Query(this.ruleGroupsDal, this.ruleUsersDal, this.usersDal, this.operationsDal, this.groupsDal);

  public Mutation = Mutation;

  public MyDate = myDateType;
}