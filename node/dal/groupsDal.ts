import { Group } from "../model/group";
import { RepoWithNumberId } from "./repo";

export class GroupsDal extends RepoWithNumberId<Group> {
    public get EntityName(): string {
        return "Group";
    }
}