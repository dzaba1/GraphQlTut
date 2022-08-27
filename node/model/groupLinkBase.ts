import { ChangeableEntity } from "./entity";

export interface GroupLinkBase extends ChangeableEntity {
    groupId: number
    childId: number
}
