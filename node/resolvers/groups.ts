import { GroupsDal } from "../dal/groupsDal";
import { OperationsDal } from "../dal/operationsDal";
import { RuleGroupsDal, RuleUsersDal } from "../dal/rulesDal";
import { UsersDal } from "../dal/usersDal";
import { NamedEntity } from "../model/entity";
import { Group } from "../model/group";
import { ChangeDataViewModel } from "./helpers";
import { RuleViewModel } from "./rules";

export class GroupViewModel implements NamedEntity<number> {
    constructor(private group: Group,
        private ruleGroupsDal: RuleGroupsDal,
        private ruleUsersDal: RuleUsersDal,
        private usersDal: UsersDal,
        private operationsDal: OperationsDal,
        private groupsDal: GroupsDal) {

    }

    public get id(): number {
        return this.group.id!;
    }

    public get name(): string {
        return this.group.name;
    }

    public get added(): ChangeDataViewModel {
        return new ChangeDataViewModel(this.group.added, this.ruleGroupsDal, this.ruleUsersDal, this.usersDal, this.operationsDal, this.groupsDal);
    }

    public get modified(): ChangeDataViewModel {
        return new ChangeDataViewModel(this.group.modified, this.ruleGroupsDal, this.ruleUsersDal, this.usersDal, this.operationsDal, this.groupsDal);
    }

    public async rules(): Promise<RuleViewModel[]> {
        const all = await this.ruleGroupsDal.getByGroupId(this.id);
        return all.map(r => new RuleViewModel(r, this.usersDal, this.operationsDal, this.groupsDal, this.ruleGroupsDal, this.ruleUsersDal));
    }
}