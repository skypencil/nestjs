import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { EntityManager, Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Todo])],
  controllers: [UsersController],
  providers: [UsersService, Repository, EntityManager],
})
export class UsersModule {}
