import { Entity, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { User } from "./user.entity";


@Entity()
export class Todo {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @Column()
    text: string;

    @Column({type: 'boolean', default: false})
    done: boolean;

    @ManyToOne(() => User, user => user.todos)
    user: User;

    constructor(todo: Partial<Todo>) {
        Object.assign(this, todo)
    }
}