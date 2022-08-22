import { UsersDal } from "../dal/usersDal";
import { NamedEntity } from "../model/entity";
import { User } from "../model/user";
import { ChangeDataViewModel } from "./helpers";

export class UserViewModel implements NamedEntity<number> {
    constructor(private user: User,
        private usersDal: UsersDal) {

    }

    public get id(): number {
        return this.user.id!;
    }

    public get name(): string {
        return this.user.name;
    }

    public get added(): ChangeDataViewModel {
        return new ChangeDataViewModel(this.user.added, this.usersDal);
    }

    public get modified(): ChangeDataViewModel {
        return new ChangeDataViewModel(this.user.modified, this.usersDal);
    }
}