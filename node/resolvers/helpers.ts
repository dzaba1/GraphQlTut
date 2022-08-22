import { UsersDal } from "../dal/usersDal";
import { ChangeData } from "../model/entity";
import { UserViewModel } from "./users";

export class ChangeDataViewModel {
    private _user?: UserViewModel;

    constructor(private data: ChangeData,
        private usersDal: UsersDal) {

    }

    public get date(): Date {
        return this.data.date;
    }

    public async user(): Promise<UserViewModel> {
        if (this._user == null) {
            const user = await this.usersDal.get(this.data.userId);
            this._user = new UserViewModel(user, this.usersDal);
        }

        return this._user;
    }
}