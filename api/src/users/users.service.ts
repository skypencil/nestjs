import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EntityManager, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from 'src/todos/entities/todo.entity';
import * as argon from "argon2"
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import jwt from 'jsonwebtoken';

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
      if (error.code === '23505') {
        return {
          'error': 'This email has already taken...!!!'
        }
      }
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
    const password_check = await argon.verify(user.hash, updateUserDto.password)
    if (!password_check) {
      throw new ForbiddenException("Invalid Password try again")
    }
    const newPasswordHash = await argon.hash(updateUserDto.newPassword)
    user.firstname = updateUserDto.firstname
    user.lastname = updateUserDto.lastname
    user.hash = newPasswordHash

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

  async refreshToken(rt: string) {
    const decodedJwt = this.jwt.decode(rt)
    return this.signToken(decodedJwt.sub, decodedJwt.email)
  }


  async signToken(userId: number, email:string): Promise<{access_token: string, refresh_token: string}> {
    const payload = {
        sub: userId, email
    }

    const atSecret = this.conf.get('JWT_TOKEN')
    const rtSecret = this.conf.get('RT_JWT_TOKEN')

    const [at, rt] = await Promise.all([
      this.jwt.signAsync(payload, {
          expiresIn: "2m",
          secret: atSecret
      }),
      this.jwt.signAsync(payload, {
        expiresIn: "60m",
        secret: rtSecret
      })
    ])


    return {access_token: at, refresh_token: rt}
  }

  
}
