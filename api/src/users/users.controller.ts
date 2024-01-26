import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateTodoDto } from './dto/create-todo.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Patch('todo/add/:id')
  async todo_add(@Param('id') id: string, @Body() createTodoDto: CreateTodoDto) {
    return this.usersService.todo_add(+id, createTodoDto);
  }

  @Patch('todo/update/:id')
  async todo_update(@Param('id') id: string) {
    return this.usersService.todo_update(+id);
  }

  @Delete('todo/delete/:id')
  async todo_delete(@Param('id') id: string) {
    return this.usersService.todo_delete(+id);
  }
}
