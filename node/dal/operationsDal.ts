import { Operation } from "../model/operation";
import { RepoWithNumberId } from "./repo";

export class OperationsDal extends RepoWithNumberId<Operation> {
    public get EntityName(): string {
        return "Operation";
    }
}