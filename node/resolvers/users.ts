import { NamedEntity } from "../model/entity";
import { User } from "../model/user";
import { DependenciesFacade } from "./dependenciesFacade";
import { GroupViewModel } from "./groups";
import { ChangeDataViewModel } from "./helpers";
import { OperationViewModel } from "./operations";
import { RuleViewModel } from "./rules";

export class UserViewModel implements NamedEntity<number> {
    constructor(private user: User,
        private dependencies: DependenciesFacade) {

    }

    public get id(): number {
        return this.user.id!;
    }

    public get name(): string {
        return this.user.name;
    }

    public get added(): ChangeDataViewModel {
        return new ChangeDataViewModel(this.user.added, this.dependencies);
    }

    public get modified(): ChangeDataViewModel {
        return new ChangeDataViewModel(this.user.modified, this.dependencies);
    }

    public async rules(): Promise<RuleViewModel[]> {
        const all = await this.dependencies.RuleUsersDal.getByUserId(this.id);
        return all.map(r => new RuleViewModel(r, this.dependencies));
    }

    public async membership(): Promise<GroupViewModel[]> {
        const parents = await this.dependencies.UserGroupLinksDal.getMembership(this.user.id!);
        return parents.map(g => new GroupViewModel(g, this.dependencies));
    }

    public async affectedPermissions(): Promise<OperationViewModel[]> {
        const operations = await this.dependencies.PermissionCalculator.resolveForUser(this.user.id!);
        return operations.map(o => new OperationViewModel(o, this.dependencies));
    }
}