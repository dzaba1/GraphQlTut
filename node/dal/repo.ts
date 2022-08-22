import { Mutex } from 'async-mutex';
import { Entity } from '../model/entity'

export abstract class Repo<T extends Entity<TId>, TId> {
    protected entities: T[] = []
    protected mutex = new Mutex()

    public abstract get EntityName(): string;

    public async getAll(): Promise<T[]> {
        return await this.mutex.runExclusive(() => {
            console.log(`Getting all entities of type '${this.EntityName}'.`);
            return this.entities;
        });
    }

    public async get(id: TId): Promise<T> {
        return await this.mutex.runExclusive(() => {
            console.log(`Getting a '${this.EntityName}' with ID '${id}'.`);

            const res = this.entities.find(e => e.id == id);
            if (res == null) {
                throw new Error(`Can't find entity with ID ${id}}`);
            }

            return res;
        });
    }

    public async exists(id: TId): Promise<boolean> {
        return await this.mutex.runExclusive(() => {
            console.log(`Checking if a '${this.EntityName}' exists with ID '${id}'.`);
            return this.existsInternal(id);
        });
    }

    protected existsInternal(id: TId): boolean {
        return this.entities.findIndex(e => e.id === id) >= 0
    }

    public async delete(id: TId): Promise<void> {
        await this.mutex.runExclusive(() => {
            console.log(`Deleting a '${this.EntityName}' with ID '${id}'.`);
            this.deleteInternal(id);
        });
    }

    protected deleteInternal(id: TId) {
        this.entities = this.entities.filter(e => e.id !== id);
    }

    public async update(entity: T): Promise<void> {
        await this.mutex.runExclusive(() => {
            if (entity.id == null) {
                throw new TypeError("ID can't be empty.");
            }

            console.log(`Updating a '${this.EntityName}' with ID '${entity.id}'.`);

            if (this.existsInternal(entity.id)) {
                this.deleteInternal(entity.id)
                this.addInternal(entity)
            } else {
                throw new Error(`Can't find entity with ID ${entity.id}}`);
            }
        });
    }

    public async addWithIncrement(entity: T): Promise<TId> {
        return await this.mutex.runExclusive(() => {
            console.log(`Adding a new '${this.EntityName}'.`);
            const id = this.getNextId();
            entity.id = id;
            this.addInternal(entity);
            return id;
        });
    }

    protected abstract getNextId(): TId;

    protected addInternal(entity: T) {
        if (entity.id == null) {
            throw new TypeError("ID can't be empty.");
        }

        if (this.existsInternal(entity.id)) {
            throw new Error(`Entity with ID ${entity.id}} is already added.`);
        }
        this.entities.push(entity)
    }
}
