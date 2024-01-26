import { User } from "./user.entity";
export declare class Todo {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    text: string;
    done: boolean;
    user: User;
    constructor(todo: Partial<Todo>);
}
