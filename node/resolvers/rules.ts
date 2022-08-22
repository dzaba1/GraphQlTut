import { GroupsDal } from "../dal/groupsDal";
import { OperationsDal } from "../dal/operationsDal";
import { RuleGroupsDal, RuleUsersDal } from "../dal/rulesDal";
import { UsersDal } from "../dal/usersDal";
import { RuleBase, RuleGroup, RuleUser } from "../model/rule";
import { GroupViewModel } from "./groups";
import { ChangeDataViewModel } from "./helpers";
import { OperationViewModel } from "./operations";
import { UserViewModel } from "./users";

export type RuleReference = GroupViewModel | UserViewModel;

export class RuleViewModel {
    private _operation?: OperationViewModel;

    constructor(private rule: RuleBase,
        private usersDal: UsersDal,
        private operationsDal: OperationsDal,
        private groupsDal: GroupsDal,
        private ruleGroupsDal: RuleGroupsDal,
        private ruleUsersDal: RuleUsersDal) {

    }

    public get added(): ChangeDataViewModel {
        return new ChangeDataViewModel(this.rule.added, this.ruleGroupsDal, this.ruleUsersDal, this.usersDal, this.operationsDal, this.groupsDal);
    }

    public get modified(): ChangeDataViewModel {
        return new ChangeDataViewModel(this.rule.modified, this.ruleGroupsDal, this.ruleUsersDal, this.usersDal, this.operationsDal, this.groupsDal);
    }

    public get allow(): boolean {
        return this.rule.allow;
    }

    public async reference(): Promise<RuleReference> {
        const userRule = this.rule as RuleUser;
        if (userRule != null && userRule.userId != null) {
            const user = await this.usersDal.get(userRule.userId);
            return new UserViewModel(user, this.ruleGroupsDal, this.ruleUsersDal, this.usersDal, this.operationsDal, this.groupsDal);
        }

        const groupRule = this.rule as RuleGroup;
        if (groupRule != null && groupRule.groupId != null) {
            const group = await this.groupsDal.get(groupRule.groupId);
            return new GroupViewModel(group, this.ruleGroupsDal, this.ruleUsersDal, this.usersDal, this.operationsDal, this.groupsDal);
        }

        throw new TypeError("Unknown rule type.");
    }

    public async operation(): Promise<OperationViewModel> {
        if (this._operation == null) {
            const oper = await this.operationsDal.get(this.rule.operationId);
            this._operation = new OperationViewModel(oper, this.ruleGroupsDal, this.ruleUsersDal, this.usersDal, this.operationsDal, this.groupsDal);
        }

        return this._operation;
    }
}