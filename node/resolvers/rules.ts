import { RuleBase, RuleGroup, RuleUser } from "../model/rule";
import { DependenciesFacade } from "./dependenciesFacade";
import { GroupViewModel } from "./groups";
import { ChangeDataViewModel } from "./helpers";
import { OperationViewModel } from "./operations";
import { UserViewModel } from "./users";

export type RuleReference = GroupViewModel | UserViewModel;

export class RuleViewModel {
    private _operation?: OperationViewModel;

    constructor(private rule: RuleBase,
        private dependencies: DependenciesFacade) {

    }

    public get added(): ChangeDataViewModel {
        return new ChangeDataViewModel(this.rule.added, this.dependencies);
    }

    public get modified(): ChangeDataViewModel {
        return new ChangeDataViewModel(this.rule.modified, this.dependencies);
    }

    public get allow(): boolean {
        return this.rule.allow;
    }

    public async reference(): Promise<RuleReference> {
        const userRule = this.rule as RuleUser;
        if (userRule != null && userRule.userId != null) {
            const user = await this.dependencies.UsersDal.get(userRule.userId);
            return new UserViewModel(user, this.dependencies);
        }

        const groupRule = this.rule as RuleGroup;
        if (groupRule != null && groupRule.groupId != null) {
            const group = await this.dependencies.GroupsDal.get(groupRule.groupId);
            return new GroupViewModel(group, this.dependencies);
        }

        throw new TypeError("Unknown rule type.");
    }

    public async operation(): Promise<OperationViewModel> {
        if (this._operation == null) {
            const oper = await this.dependencies.OperationsDal.get(this.rule.operationId);
            this._operation = new OperationViewModel(oper, this.dependencies);
        }

        return this._operation;
    }
}