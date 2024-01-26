import { todo } from "node:test";
import { Entity, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, Column, OneToMany } from "typeorm";
import { Todo } from "./todo.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @Column()
    email: string;

    @Column()
    hash: string;

    @Column({nullable: true})
    firstname: string

    @Column({nullable: true})
    lastname: string

    @OneToMany(() => Todo, todo => todo.user, {cascade: true})
    todos: Todo[]

    constructor(user: Partial<User>) {
        Object.assign(this, user)
    }
}
