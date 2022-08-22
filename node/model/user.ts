import { ChangeableEntity, NamedEntity } from "./entity";

export interface User extends NamedEntity<number>, ChangeableEntity {
    
}