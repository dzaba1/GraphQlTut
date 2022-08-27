import { GroupLinksDal, UserGroupLinksDal } from "../dal/groupLinksDal";
import { GroupsDal } from "../dal/groupsDal";
import { OperationsDal } from "../dal/operationsDal";
import { RuleGroupsDal, RuleUsersDal } from "../dal/rulesDal";
import { UsersDal } from "../dal/usersDal";
import { NamedEntity } from "../model/entity";
import { User } from "../model/user";
import { GroupViewModel } from "./groups";
import { ChangeDataViewModel } from "./helpers";
import { RuleViewModel } from "./rules";

export class UserViewModel implements NamedEntity<number> {
    constructor(private user: User,
        private ruleGroupsDal: RuleGroupsDal,
        private ruleUsersDal: RuleUsersDal,
        private usersDal: UsersDal,
        private operationsDal: OperationsDal,
        private groupsDal: GroupsDal,
        private groupLinksDal: GroupLinksDal,
        private userGroupLinksDal: UserGroupLinksDal) {

    }

    public get id(): number {
        return this.user.id!;
    }

    public get name(): string {
        return this.user.name;
    }

    public get added(): ChangeDataViewModel {
        return new ChangeDataViewModel(this.user.added, this.ruleGroupsDal, this.ruleUsersDal, this.usersDal, this.operationsDal, this.groupsDal, this.groupLinksDal, this.userGroupLinksDal);
    }

    public get modified(): ChangeDataViewModel {
        return new ChangeDataViewModel(this.user.modified, this.ruleGroupsDal, this.ruleUsersDal, this.usersDal, this.operationsDal, this.groupsDal, this.groupLinksDal, this.userGroupLinksDal);
    }

    public async rules(): Promise<RuleViewModel[]> {
        const all = await this.ruleUsersDal.getByUserId(this.id);
        return all.map(r => new RuleViewModel(r, this.usersDal, this.operationsDal, this.groupsDal, this.ruleGroupsDal, this.ruleUsersDal, this.groupLinksDal, this.userGroupLinksDal));
    }

    public async membership(): Promise<GroupViewModel[]> {
        const parents = await this.userGroupLinksDal.getMembership(this.user.id!);
        return parents.map(g => new GroupViewModel(g, this.ruleGroupsDal, this.ruleUsersDal, this.usersDal, this.operationsDal, this.groupsDal, this.groupLinksDal, this.userGroupLinksDal));
    }
}