import { Todo } from "./todo.entity";
export declare class User {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    hash: string;
    firstname: string;
    lastname: string;
    todos: Todo[];
    constructor(user: Partial<User>);
}
