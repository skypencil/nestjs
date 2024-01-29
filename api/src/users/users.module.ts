import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { EntityManager, Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';

@Module({
  imports: [TypeOrmModule.forFeature([User, Todo]), JwtModule],
  controllers: [UsersController],
  providers: [UsersService, Repository, EntityManager, JwtStrategy],
})
export class UsersModule {}
