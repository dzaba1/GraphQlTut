import { ChangeableEntity } from "./entity";

export interface RuleBase extends ChangeableEntity {
    allow: boolean
    operationId: number
}

export interface RuleGroup extends RuleBase {
    groupId: number
}

export interface RuleUser extends RuleBase {
    userId: number
}