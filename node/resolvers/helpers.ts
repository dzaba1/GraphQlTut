import { GroupLinksDal, UserGroupLinksDal } from "../dal/groupLinksDal";
import { GroupsDal } from "../dal/groupsDal";
import { OperationsDal } from "../dal/operationsDal";
import { RuleGroupsDal, RuleUsersDal } from "../dal/rulesDal";
import { UsersDal } from "../dal/usersDal";
import { ChangeData } from "../model/entity";
import { UserViewModel } from "./users";

export class ChangeDataViewModel {
    constructor(private data: ChangeData,
        private ruleGroupsDal: RuleGroupsDal,
        private ruleUsersDal: RuleUsersDal,
        private usersDal: UsersDal,
        private operationsDal: OperationsDal,
        private groupsDal: GroupsDal,
        private groupLinksDal: GroupLinksDal,
        private userGroupLinksDal: UserGroupLinksDal) {

    }

    public get date(): Date {
        return this.data.date;
    }

    public async user(): Promise<UserViewModel> {
        const user = await this.usersDal.get(this.data.userId);
        return new UserViewModel(user, this.ruleGroupsDal, this.ruleUsersDal, this.usersDal, this.operationsDal, this.groupsDal, this.groupLinksDal, this.userGroupLinksDal);
    }
}