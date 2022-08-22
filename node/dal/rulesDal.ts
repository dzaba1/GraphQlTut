import { RuleGroup, RuleUser } from "../model/rule";
import { RepoNoId } from "./repo";

export abstract class RuleGroupsDalBase extends RepoNoId<RuleGroup> {

}

export abstract class RuleUsersDalBase extends RepoNoId<RuleUser> {

}