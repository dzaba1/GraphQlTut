import { RuleBase } from "../model/rule";
import { DependenciesFacade } from "./dependenciesFacade";
import { OperationViewModel } from "./operations";
import { RuleViewModel } from "./rules";

export class Query {
    constructor(private dependencies: DependenciesFacade) {

    }

    public async operations(obj: any, params: any): Promise<OperationViewModel[]> {
        const id = params.id;
        if (id != null) {
            const oper = await this.dependencies.OperationsDal.get(Number(id));
            return [new OperationViewModel(oper, this.dependencies)];
        }

        const all = await this.dependencies.OperationsDal.getAll();
        return all.map(o => new OperationViewModel(o, this.dependencies));
    }

    public async rules(): Promise<RuleViewModel[]> {
        const groups: RuleBase[] = await this.dependencies.RuleGroupsDal.getAll();
        const users: RuleBase[] = await this.dependencies.RuleUsersDal.getAll();
        const all = groups.concat(users);

        return all.map(r => new RuleViewModel(r, this.dependencies));
    }
}
