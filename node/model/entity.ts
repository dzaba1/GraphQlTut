export interface Entity<TId> {
    id?: TId
}

export interface NamedEntity<TId> extends Entity<TId> {
    name: string
}

export interface ChangeableEntity {
    added: ChangeData
    modified: ChangeData
}

export interface ChangeData {
    date: Date
    userId: number
}