import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateTodoDto } from './dto/create-todo.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post("signin")
  async signin(@Body() userDto: CreateUserDto) {
    return this.usersService.signin(userDto);
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

  @UseGuards(AuthGuard('jwt-rt'))
  @Post('refresh')
  async refresh(@Req() req: Request) {
    const user = req.user
    return this.usersService.refreshToken(user["refreshToken"])
  }

  @Get('todo/add/all')
  async todo_get() {
    return this.usersService.todo_get();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('todo/:id')
  async todo_get_from_one_user(@Param('id') id: string) {
    return this.usersService.todo_get_from_one_user(+id);
  }


  @UseGuards(AuthGuard('jwt'))
  @Patch('todo/add/:id')
  async todo_add(@Param('id') id: string, @Body() createTodoDto: CreateTodoDto) {
    return this.usersService.todo_add(+id, createTodoDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('todo/update/:id')
  async todo_update(@Param('id') id: string) {
    return this.usersService.todo_update(+id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('todo/delete/:id')
  async todo_delete(@Param('id') id: string) {
    return this.usersService.todo_delete(+id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('todo/one/:id')
  async get_one_todo(@Param('id') id: string) {
    return this.usersService.get_one_todo(+id)
  }
}
