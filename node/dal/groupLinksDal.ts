import { Group } from "../model/group";
import { GroupLinkBase } from "../model/groupLinkBase";
import { User } from "../model/user";
import { GroupsDal } from "./groupsDal";
import { RepoNoId } from "./repo";
import { UsersDal } from "./usersDal";

export class UserGroupLinksDal extends RepoNoId<GroupLinkBase> {
    constructor(private usersDal: UsersDal,
        private groupsDal: GroupsDal) {
        super();
    }

    public get EntityName(): string {
        return "UserGroupLinks";
    }

    public async getMembers(groupId: number): Promise<User[]> {
        const links = await this.mutex.runExclusive(() => {
            return this.entities.filter(l => l.groupId === groupId);
        });

        const result: User[] = [];
        for (const link of links) {
            const user = await this.usersDal.get(link.childId);
            result.push(user);
        }
        return result;
    }

    public async getMembership(userId: number): Promise<Group[]> {
        const links = await this.mutex.runExclusive(() => {
            return this.entities.filter(l => l.childId === userId);
        });

        const result: Group[] = [];
        for (const link of links) {
            const group = await this.groupsDal.get(link.groupId);
            result.push(group);
        }
        return result;
    }
}

export class GroupLinksDal extends RepoNoId<GroupLinkBase> {
    constructor(private groupsDal: GroupsDal) {
        super();
    }

    public get EntityName(): string {
        return "GroupLinks";
    }

    public async getMembers(parentId: number): Promise<Group[]> {
        const links = await this.mutex.runExclusive(() => {
            return this.entities.filter(l => l.groupId === parentId);
        });

        const result: Group[] = [];
        for (const link of links) {
            const group = await this.groupsDal.get(link.childId);
            result.push(group);
        }
        return result;
    }

    public async getMembership(groupId: number): Promise<Group[]> {
        const links = await this.mutex.runExclusive(() => {
            return this.entities.filter(l => l.childId === groupId);
        });

        const result: Group[] = [];
        for (const link of links) {
            const group = await this.groupsDal.get(link.groupId);
            result.push(group);
        }
        return result;
    }
}

