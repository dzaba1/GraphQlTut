import { RuleBase, RuleGroup, RuleUser } from "../model/rule";
import { RepoNoId } from "./repo";

export abstract class RulesDalBase<T extends RuleBase> extends RepoNoId<T> {
    
}

export abstract class RuleGroupsDalBase extends RulesDalBase<RuleGroup> {

}

export abstract class RuleUsersDalBase extends RulesDalBase<RuleUser> {

}