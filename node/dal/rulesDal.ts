import { RuleGroup, RuleUser } from "../model/rule";
import { RepoNoId } from "./repo";

export class RuleGroupsDal extends RepoNoId<RuleGroup> {
    public get EntityName(): string {
        return "RuleGroup";
    }
    
    public async getByOperationId(operationId: number): Promise<RuleGroup[]> {
        return await this.mutex.runExclusive(() => {
            console.log(`Getting '${this.EntityName}' with operation ID '${operationId}'.`);

            return this.entities.filter(e => e.operationId == operationId);
        });
    }

    public async getByGroupId(groupId: number): Promise<RuleGroup[]> {
        return await this.mutex.runExclusive(() => {
            console.log(`Getting '${this.EntityName}' with group ID '${groupId}'.`);

            return this.entities.filter(e => e.groupId == groupId);
        });
    }
}

export class RuleUsersDal extends RepoNoId<RuleUser> {
    public get EntityName(): string {
        return "RuleUser";
    }

    public async getByOperationId(operationId: number): Promise<RuleUser[]> {
        return await this.mutex.runExclusive(() => {
            console.log(`Getting '${this.EntityName}' with operation ID '${operationId}'.`);

            return this.entities.filter(e => e.operationId == operationId);
        });
    }

    public async getByUserId(userId: number): Promise<RuleUser[]> {
        return await this.mutex.runExclusive(() => {
            console.log(`Getting '${this.EntityName}' with user ID '${userId}'.`);

            return this.entities.filter(e => e.userId == userId);
        });
    }
}