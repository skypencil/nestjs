import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EntityManager, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import * as argon from "argon2"
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Todo) private readonly todoRepo: Repository<Todo>,
    private readonly entityManager: EntityManager,
    private jwt: JwtService,
    private conf: ConfigService
  ) {}

  async create(createUserDto: CreateUserDto) {

    try {
      const hash = await argon.hash(createUserDto.password)
      const newUser = new User({
        email: createUserDto.email,
        hash: hash,
        todos: []
      })
      await this.userRepo.save(newUser)
      return this.signToken(newUser.id, newUser.email)
    }
    catch (error) {
      throw error
    }
  }

  async signin(userDto: CreateUserDto) {

    try {
      const user = await this.userRepo.findOneBy({email:userDto.email})
      if (!user) {throw new ForbiddenException(`No Such User With Email of: ${userDto.email}`)}

      const password_check = await argon.verify(user.hash, userDto.password)
      if (!password_check) {
        throw new ForbiddenException("Invalid Password try again")
    }

      return this.signToken(user.id, user.email)
    }
    catch (error) {
      throw error
    }
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
    await this.todoRepo.delete({ user: user });
    this.userRepo.delete(id)
    return `User with id ${id} deleted successfully`;
  }

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

  async get_one_todo(id: number) {
    const todo = await this.todoRepo.findOne({where: {id}})
    if (!todo) {throw new ForbiddenException(`No Such Todo With ID of: ${id}`)}
    return {
      todo
    };
  }


  async signToken(userId: number, email:string): Promise<{access_token: string}> {
    const payload = {
        sub: userId, email
    }

    const secret = this.conf.get('JWT_TOKEN')

    const token = await this.jwt.signAsync(payload, {
        expiresIn: "10m",
        secret: secret
    })

    return {access_token: token}
  }

  
}
