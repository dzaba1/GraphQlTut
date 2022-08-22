import { GroupsDal } from "../dal/groupsDal";
import { OperationsDal } from "../dal/operationsDal";
import { RuleGroupsDal, RuleUsersDal } from "../dal/rulesDal";
import { UsersDal } from "../dal/usersDal";
import { RuleBase } from "../model/rule";
import { OperationViewModel } from "./operations";
import { RuleViewModel } from "./rules";

export class Query {
    constructor(private ruleGroupsDal: RuleGroupsDal,
        private ruleUsersDal: RuleUsersDal,
        private usersDal: UsersDal,
        private operationsDal: OperationsDal,
        private groupsDal: GroupsDal) {

    }

    public async operations(obj: any, params: any): Promise<OperationViewModel[]> {
        const id = params.id;
        if (id != null) {
            const oper = await this.operationsDal.get(Number(id));
            return [new OperationViewModel(oper, this.ruleGroupsDal, this.ruleUsersDal, this.usersDal, this.operationsDal, this.groupsDal)];
        }

        const all = await this.operationsDal.getAll();
        return all.map(o => new OperationViewModel(o, this.ruleGroupsDal, this.ruleUsersDal, this.usersDal, this.operationsDal, this.groupsDal));
    }

    public async rules(): Promise<RuleViewModel[]> {
        const groups: RuleBase[] = await this.ruleGroupsDal.getAll();
        const users: RuleBase[] = await this.ruleUsersDal.getAll();
        const all = groups.concat(users);

        return all.map(r => new RuleViewModel(r, this.usersDal, this.operationsDal, this.groupsDal, this.ruleGroupsDal, this.ruleUsersDal));
    }
}
