import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [UsersModule, DatabaseModule, ConfigModule.forRoot({
    isGlobal: true
  }), TodosModule],
})
export class AppModule {}
