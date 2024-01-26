import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EntityManager, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Todo } from './entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
export declare class UsersService {
    private readonly userRepo;
    private readonly todoRepo;
    private readonly entityManager;
    constructor(userRepo: Repository<User>, todoRepo: Repository<Todo>, entityManager: EntityManager);
    create(createUserDto: CreateUserDto): Promise<{
        newUser: User;
    }>;
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<{
        user: User;
    }>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<{
        user: User;
    }>;
    remove(id: number): Promise<string>;
    todo_add(id: number, createTodoDto: CreateTodoDto): Promise<{
        user: User;
    }>;
    todo_update(id: number): Promise<{
        todo: Todo;
    }>;
    todo_delete(id: number): Promise<string>;
}
