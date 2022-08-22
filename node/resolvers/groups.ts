import { UsersDal } from "../dal/usersDal";
import { NamedEntity } from "../model/entity";
import { Group } from "../model/group";
import { ChangeDataViewModel } from "./helpers";

export class GroupViewModel implements NamedEntity<number> {
    constructor(private group: Group,
        private usersDal: UsersDal) {

    }

    public get id(): number {
        return this.group.id!;
    }

    public get name(): string {
        return this.group.name;
    }

    public get added(): ChangeDataViewModel {
        return new ChangeDataViewModel(this.group.added, this.usersDal);
    }

    public get modified(): ChangeDataViewModel {
        return new ChangeDataViewModel(this.group.modified, this.usersDal);
    }
}