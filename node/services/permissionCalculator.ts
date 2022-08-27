import { GroupLinksDal, UserGroupLinksDal } from "../dal/groupLinksDal";
import { OperationsDal } from "../dal/operationsDal";
import { RuleGroupsDal, RuleUsersDal } from "../dal/rulesDal";
import { Operation } from "../model/operation";
import { RuleBase, RuleGroup } from "../model/rule";

export class PermissionCalculator {
    constructor(private userGroupLinksDal: UserGroupLinksDal,
        private ruleGroupsDal: RuleGroupsDal,
        private groupLinksDal: GroupLinksDal,
        private operationsDal: OperationsDal,
        private ruleUsersDal: RuleUsersDal) {

    }

    public async resolveForUser(userId: number): Promise<Operation[]> {
        const groupLinks = await this.userGroupLinksDal.getMembership(userId);
        let rules: RuleBase[] = [];
        for (const groupLink of groupLinks) {
            const groupRules = await this.resolveGroupRules(groupLink.id!)
            rules.push(...groupRules);
        }

        const currentRules = await this.ruleUsersDal.getByUserId(userId);
        rules.push(...currentRules);

        rules = this.mergeRules(rules);

        const result: Operation[] = [];
        for (const rule of rules) {
            const operation = await this.operationsDal.get(rule.operationId);
            result.push(operation);
        }

        return result;
    }

    public async resolveForGroup(groupId: number): Promise<Operation[]> {
        let rules = await this.resolveGroupRules(groupId);
        rules = this.mergeRules(rules);
        const result: Operation[] = [];

        for (const rule of rules) {
            const operation = await this.operationsDal.get(rule.operationId);
            result.push(operation);
        }

        return result;
    }

    private mergeRules(rules: RuleBase[]): RuleBase[] {
        const sorted = rules.sort((a, b) => {
            if (!a.allow && b.allow) {
                return -1;
            }
            if (a.allow && !b.allow) {
                return 1;
            }
            return 0;
        });

        let result: RuleBase[] = [];

        for (const rule of sorted) {
            if (rule.allow && result.find(r => r.operationId === rule.operationId) == null) {
                result.push(rule);
            }
            else if (!rule.allow && result.find(r => r.operationId == rule.operationId) != null) {
                result = result.filter(r => r.operationId !== rule.operationId);
            }
        }

        return result;
    }

    private async resolveGroupRules(groupId: number): Promise<RuleBase[]> {
        let result: RuleBase[] = [];

        const parentGroups = await this.groupLinksDal.getMembership(groupId);
        for (const parent of parentGroups) {
            const parentRules = await this.resolveGroupRules(parent.id!);
            result.push(...parentRules);
        }

        const currentRules = await this.ruleGroupsDal.getByGroupId(groupId);
        result.push(...currentRules);

        return result;
    }
}