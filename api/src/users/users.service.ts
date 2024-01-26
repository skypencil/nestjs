import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EntityManager, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Todo) private readonly todoRepo: Repository<Todo>,
    private readonly entityManager: EntityManager
  ) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = new User({
      ...createUserDto,
      todos: []
    })
    await this.userRepo.save(newUser)
    return {
      newUser
    };
  }

  async findAll() {
    return this.userRepo.find({relations: {todos: true}});
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOne({where: {id}, relations: ['todos']})
    if (!user) {throw new ForbiddenException(`No Such User With ID of: ${id}`)}
    return {
      user
    };
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepo.findOneBy({id})
    if (!user) {throw new ForbiddenException(`No Such User With ID of: ${id}`)}
    user.firstname = updateUserDto.firstname
    user.lastname = updateUserDto.lastname

    this.userRepo.save(user)
    return {
      user
    };
  }


  async remove(id: number) {
    const user = await this.userRepo.findOneBy({id})
    if (!user) {throw new ForbiddenException(`No Such User With ID of: ${id}`)}
    this.userRepo.delete(id)
    return `User with id ${id} deleted successfully`;
  }


  async todo_add(id: number, createTodoDto: CreateTodoDto) {
    const user = await this.userRepo.findOne({where: {id}, relations: ['todos']})
    if (!user) {throw new ForbiddenException(`No Such User With ID of: ${id}`)}

    const todo = createTodoDto.todos.map(t => new Todo(t))

    user.todos = [...user.todos, ...todo];

    this.userRepo.save(user)
    return {
      user
    };
  }


  async todo_update(id: number) {
    const todo = await this.todoRepo.findOneBy({id})
    
    if (!todo) {throw new ForbiddenException(`No Such Todo With ID of: ${id}`)}
    if (todo.done) {
      todo.done = false
    } else {todo.done = true}
    this.todoRepo.save(todo)
    return {
      todo
    };
  }

  async todo_delete(id: number) {
    const todo = await this.todoRepo.findOneBy({id})
    
    if (!todo) {throw new ForbiddenException(`No Such Todo With ID of: ${id}`)}
    
    this.todoRepo.delete(id)
    return `Todo with id ${id} deleted successfully`;
  }

  
}
