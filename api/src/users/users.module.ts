import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { EntityManager, Repository } from 'typeorm';
import { Todo } from 'src/todos/entities/todo.entity';
import { JwtModule } from '@nestjs/jwt';
import { AtStrategy, RtStrategy } from './strategy';
import { TodosModule } from 'src/todos/todos.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Todo]), JwtModule, TodosModule],
  controllers: [UsersController],
  providers: [UsersService, Repository, EntityManager, AtStrategy, RtStrategy],
})
export class UsersModule {}
