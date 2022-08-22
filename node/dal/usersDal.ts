import { User } from "../model/user";
import { RepoWithNumberId } from "./repo";

export class UsersDal extends RepoWithNumberId<User> {
    public get EntityName(): string {
        return "User";
    }
}