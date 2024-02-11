import { ForbiddenException, Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Todo) private readonly todoRepo: Repository<Todo>,
  ) {}

  async todo_get() {
    const todos = await this.todoRepo.find();
    return todos
  }

  async todo_get_from_one_user(id: number) {
    const user = await this.userRepo.findOne({where: {id}, relations: ['todos']})
    if (!user) {throw new ForbiddenException(`No Such User With ID of: ${id}`)}
    const todos = user.todos
    return {
      todos
    };
  }

  async get_one_todo(id: number) {
    const todo = await this.todoRepo.findOne({where: {id}})
    if (!todo) {throw new ForbiddenException(`No Such Todo With ID of: ${id}`)}
    return {
      todo
    };
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


  async todo_update(id: number, userid: number, updateDto: UpdateTodoDto) {
    const todo = await this.todoRepo.findOne({where: {id}, relations: ['user']})
    const user = await this.userRepo.findOneBy({id:userid})
    if (!todo) {throw new ForbiddenException(`No Such Todo With ID of: ${id}`)}
    if (todo.user.id !== user.id) {throw new ForbiddenException(`Todo with id of ${id} isn't belongs to this user`)}

    if (!updateDto.done) {
      if (todo.done) {
        todo.done = false
      } else {todo.done = true}
    }
    else {
      todo.done = updateDto.done
    }

    if (updateDto.text) {
      todo.text = updateDto.text
    }
    this.todoRepo.save(todo)
    return {
      todo
    };
  }

  async todo_delete(id: number, userid: number) {
    const todo = await this.todoRepo.findOne({where: {id}, relations: ['user']})
    const user = await this.userRepo.findOneBy({id:userid})

    if (!todo) {throw new ForbiddenException(`No Such Todo With ID of: ${id}`)}
    if (todo.user.id !== user.id) {throw new ForbiddenException(`Todo with id of ${id} isn't belongs to this user`)}

    this.todoRepo.delete(id)
    return `Todo with id ${id} deleted successfully`;
  }

}
