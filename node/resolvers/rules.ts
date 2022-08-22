import { OperationsDal } from "../dal/operationsDal";
import { UsersDal } from "../dal/usersDal";
import { RuleBase } from "../model/rule";
import { GroupViewModel } from "./groups";
import { ChangeDataViewModel } from "./helpers";
import { OperationViewModel } from "./operations";
import { UserViewModel } from "./users";

export class RuleViewModelBase {
    private _operation?: OperationViewModel;

    constructor(private rule: RuleBase,
        private usersDal: UsersDal,
        private operationsDal: OperationsDal) {

    }

    public get added(): ChangeDataViewModel {
        return new ChangeDataViewModel(this.rule.added, this.usersDal);
    }

    public get modified(): ChangeDataViewModel {
        return new ChangeDataViewModel(this.rule.modified, this.usersDal);
    }

    public get allow(): boolean {
        return this.rule.allow;
    }

    public async reference(): Promise<UserViewModel | GroupViewModel> {

    }

    public async operation(): Promise<OperationViewModel> {
        if (this._operation == null) {
            const oper = await this.operationsDal.get(this.rule.operationId);
            this._operation = new OperationViewModel(oper);
        }

        return this._operation;
    }
}