import { GroupsDal } from "../dal/groupsDal";
import { OperationsDal } from "../dal/operationsDal";
import { RuleGroupsDal, RuleUsersDal } from "../dal/rulesDal";
import { UsersDal } from "../dal/usersDal";
import { NamedEntity } from "../model/entity";
import { Operation } from "../model/operation";
import { RuleBase } from "../model/rule";
import { RuleViewModelBase } from "./rules";

export class OperationViewModel implements NamedEntity<number> {
    private _rules?: RuleViewModelBase[];

    constructor(private operation: Operation,
        private ruleGroupsDal: RuleGroupsDal,
        private ruleUsersDal: RuleUsersDal,
        private usersDal: UsersDal,
        private operationsDal: OperationsDal,
        private groupsDal: GroupsDal) {

    }

    public get id(): number {
        return this.operation.id!;
    }

    public get name(): string {
        return this.operation.name;
    }

    public async rules(): Promise<RuleViewModelBase[]> {
        if (this._rules == null) {
            const groups: RuleBase[] = await this.ruleGroupsDal.getByOperationId(this.id);
            const users: RuleBase[] = await this.ruleUsersDal.getByOperationId(this.id);
            const all = groups.concat(users);

            this._rules = all.map(r => new RuleViewModelBase(r, this.usersDal, this.operationsDal, this.groupsDal, this.ruleGroupsDal, this.ruleUsersDal));
        }

        return this._rules;
    }
}