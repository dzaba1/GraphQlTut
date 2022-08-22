import { NamedEntity } from "../model/entity";
import { Operation } from "../model/operation";
import { RuleViewModelBase } from "./rules";

export class OperationViewModel implements NamedEntity<number> {
    constructor(private operation: Operation) {

    }

    public get id(): number {
        return this.operation.id!;
    }

    public get name(): string {
        return this.operation.name;
    }

    public async rules(): Promise<RuleViewModelBase> {
        
    }
}