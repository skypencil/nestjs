import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateTodoDto } from './dto/create-todo.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<{
        newUser: import("./entities/user.entity").User;
    }>;
    findAll(): Promise<import("./entities/user.entity").User[]>;
    findOne(id: string): Promise<{
        user: import("./entities/user.entity").User;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        user: import("./entities/user.entity").User;
    }>;
    remove(id: string): Promise<string>;
    todo_add(id: string, createTodoDto: CreateTodoDto): Promise<{
        user: import("./entities/user.entity").User;
    }>;
    todo_update(id: string): Promise<{
        todo: import("./entities/todo.entity").Todo;
    }>;
    todo_delete(id: string): Promise<string>;
}
