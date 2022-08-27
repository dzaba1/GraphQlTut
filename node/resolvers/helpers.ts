import { ChangeData } from "../model/entity";
import { DependenciesFacade } from "./dependenciesFacade";
import { UserViewModel } from "./users";

export class ChangeDataViewModel {
    constructor(private data: ChangeData,
        private dependencies: DependenciesFacade) {

    }

    public get date(): Date {
        return this.data.date;
    }

    public async user(): Promise<UserViewModel> {
        const user = await this.dependencies.UsersDal.get(this.data.userId);
        return new UserViewModel(user, this.dependencies);
    }
}