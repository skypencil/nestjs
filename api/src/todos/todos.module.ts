import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { JwtModule } from '@nestjs/jwt';
import { EntityManager, Repository } from 'typeorm';
import { AtStrategy, RtStrategy } from 'src/users/strategy';
import { UsersModule } from 'src/users/users.module';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Todo, User]), JwtModule],
  controllers: [TodosController],
  providers: [TodosService, Repository, EntityManager, AtStrategy, RtStrategy], 
})
export class TodosModule {}
