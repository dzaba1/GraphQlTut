import { GroupLinksDal, UserGroupLinksDal } from "../dal/groupLinksDal";
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
    private groupsDal: GroupsDal,
    private groupLinksDal: GroupLinksDal,
    private userGroupLinksDal: UserGroupLinksDal) {

  }

  public Query = new Query(this.ruleGroupsDal, this.ruleUsersDal, this.usersDal, this.operationsDal, this.groupsDal, this.groupLinksDal, this.userGroupLinksDal);

  public Mutation = Mutation;

  public MyDate = myDateType;
}