import { NamedEntity } from "../model/entity";
import { Operation } from "../model/operation";
import { RuleBase } from "../model/rule";
import { DependenciesFacade } from "./dependenciesFacade";
import { RuleViewModel } from "./rules";

export class OperationViewModel implements NamedEntity<number> {
    constructor(private operation: Operation,
        private dependencies: DependenciesFacade) {

    }

    public get id(): number {
        return this.operation.id!;
    }

    public get name(): string {
        return this.operation.name;
    }

    public async rules(): Promise<RuleViewModel[]> {
        const groups: RuleBase[] = await this.dependencies.RuleGroupsDal.getByOperationId(this.id);
        const users: RuleBase[] = await this.dependencies.RuleUsersDal.getByOperationId(this.id);
        const all = groups.concat(users);

        return all.map(r => new RuleViewModel(r, this.dependencies));
    }
}