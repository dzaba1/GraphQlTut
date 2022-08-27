import { GroupLinksDal, UserGroupLinksDal } from "../dal/groupLinksDal";
import { GroupsDal } from "../dal/groupsDal";
import { OperationsDal } from "../dal/operationsDal";
import { RuleGroupsDal, RuleUsersDal } from "../dal/rulesDal";
import { UsersDal } from "../dal/usersDal";
import { PermissionCalculator } from "../services/permissionCalculator";

export class DependenciesFacade {
    constructor(public RuleGroupsDal: RuleGroupsDal,
        public RuleUsersDal: RuleUsersDal,
        public UsersDal: UsersDal,
        public OperationsDal: OperationsDal,
        public GroupsDal: GroupsDal,
        public GroupLinksDal: GroupLinksDal,
        public UserGroupLinksDal: UserGroupLinksDal,
        public PermissionCalculator: PermissionCalculator) {

    }
}