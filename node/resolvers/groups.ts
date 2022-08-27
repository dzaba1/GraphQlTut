import { GroupLinksDal, UserGroupLinksDal } from "../dal/groupLinksDal";
import { GroupsDal } from "../dal/groupsDal";
import { OperationsDal } from "../dal/operationsDal";
import { RuleGroupsDal, RuleUsersDal } from "../dal/rulesDal";
import { UsersDal } from "../dal/usersDal";
import { NamedEntity } from "../model/entity";
import { Group } from "../model/group";
import { ChangeDataViewModel } from "./helpers";
import { RuleViewModel } from "./rules";
import { UserViewModel } from "./users";

export type GroupMember = GroupViewModel | UserViewModel;

export class GroupViewModel implements NamedEntity<number> {
    constructor(private group: Group,
        private ruleGroupsDal: RuleGroupsDal,
        private ruleUsersDal: RuleUsersDal,
        private usersDal: UsersDal,
        private operationsDal: OperationsDal,
        private groupsDal: GroupsDal,
        private groupLinksDal: GroupLinksDal,
        private userGroupLinksDal: UserGroupLinksDal) {

    }

    public get id(): number {
        return this.group.id!;
    }

    public get name(): string {
        return this.group.name;
    }

    public get added(): ChangeDataViewModel {
        return new ChangeDataViewModel(this.group.added, this.ruleGroupsDal, this.ruleUsersDal, this.usersDal, this.operationsDal, this.groupsDal, this.groupLinksDal, this.userGroupLinksDal);
    }

    public get modified(): ChangeDataViewModel {
        return new ChangeDataViewModel(this.group.modified, this.ruleGroupsDal, this.ruleUsersDal, this.usersDal, this.operationsDal, this.groupsDal, this.groupLinksDal, this.userGroupLinksDal);
    }

    public async rules(): Promise<RuleViewModel[]> {
        const all = await this.ruleGroupsDal.getByGroupId(this.id);
        return all.map(r => new RuleViewModel(r, this.usersDal, this.operationsDal, this.groupsDal, this.ruleGroupsDal, this.ruleUsersDal, this.groupLinksDal, this.userGroupLinksDal));
    }

    public async membership(): Promise<GroupViewModel[]> {
        const parents = await this.groupLinksDal.getMembership(this.group.id!);
        return parents.map(g => new GroupViewModel(g, this.ruleGroupsDal, this.ruleUsersDal, this.usersDal, this.operationsDal, this.groupsDal, this.groupLinksDal, this.userGroupLinksDal));
    }

    public async members(): Promise<GroupMember[]> {
        const groupMembers = await this.groupLinksDal.getMembers(this.group.id!);
        const groupVms = groupMembers.map(g => new GroupViewModel(g, this.ruleGroupsDal, this.ruleUsersDal, this.usersDal, this.operationsDal, this.groupsDal, this.groupLinksDal, this.userGroupLinksDal));

        const userMembers = await this.userGroupLinksDal.getMembers(this.group.id!);
        const userVms = userMembers.map(u => new UserViewModel(u, this.ruleGroupsDal, this.ruleUsersDal, this.usersDal, this.operationsDal, this.groupsDal, this.groupLinksDal, this.userGroupLinksDal));

        const result: GroupMember[] = [];
        result.push(...groupVms);
        result.push(...userVms);

        return result;
    }
}