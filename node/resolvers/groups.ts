import { NamedEntity } from "../model/entity";
import { Group } from "../model/group";
import { DependenciesFacade } from "./dependenciesFacade";
import { ChangeDataViewModel } from "./helpers";
import { OperationViewModel } from "./operations";
import { RuleViewModel } from "./rules";
import { UserViewModel } from "./users";

export type GroupMember = GroupViewModel | UserViewModel;

export class GroupViewModel implements NamedEntity<number> {
    constructor(private group: Group,
        private dependencies: DependenciesFacade) {

    }

    public get id(): number {
        return this.group.id!;
    }

    public get name(): string {
        return this.group.name;
    }

    public get added(): ChangeDataViewModel {
        return new ChangeDataViewModel(this.group.added, this.dependencies);
    }

    public get modified(): ChangeDataViewModel {
        return new ChangeDataViewModel(this.group.modified, this.dependencies);
    }

    public async rules(): Promise<RuleViewModel[]> {
        const all = await this.dependencies.RuleGroupsDal.getByGroupId(this.id);
        return all.map(r => new RuleViewModel(r, this.dependencies));
    }

    public async membership(): Promise<GroupViewModel[]> {
        const parents = await this.dependencies.GroupLinksDal.getMembership(this.group.id!);
        return parents.map(g => new GroupViewModel(g, this.dependencies));
    }

    public async members(): Promise<GroupMember[]> {
        const groupMembers = await this.dependencies.GroupLinksDal.getMembers(this.group.id!);
        const groupVms = groupMembers.map(g => new GroupViewModel(g, this.dependencies));

        const userMembers = await this.dependencies.UserGroupLinksDal.getMembers(this.group.id!);
        const userVms = userMembers.map(u => new UserViewModel(u, this.dependencies));

        const result: GroupMember[] = [];
        result.push(...groupVms);
        result.push(...userVms);

        return result;
    }

    public async affectedPermissions(): Promise<OperationViewModel[]> {
        const operations = await this.dependencies.PermissionCalculator.resolveForGroup(this.group.id!);
        return operations.map(o => new OperationViewModel(o, this.dependencies));
    }
}