import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { UpdateTodoDto } from './dto/update-todo.dto';


@Controller('todos')
@UseGuards(AuthGuard('jwt'))
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get('all')
  async todo_get() {
    return this.todosService.todo_get(); 
  }

  @Get('my-todos')
  async todo_get_from_one_user(@Req() req: Request) {
    const user = req.user
    return this.todosService.todo_get_from_one_user(user['sub']);
  }

  @Get('one/:id')
  async get_one_todo(@Param('id') id: string) {
    return this.todosService.get_one_todo(+id)
  }

  @Patch('add')
  async todo_add(@Req() req: Request, @Body() createTodoDto: CreateTodoDto) {
    const user = req.user
    return this.todosService.todo_add(user['sub'], createTodoDto);
  }

  @Patch('update/:id')
  async todo_update(@Req() req: Request, @Body() updateTodoDto: UpdateTodoDto, @Param('id') id: string) {
    const user = req.user
    return this.todosService.todo_update(+id, user['sub'], updateTodoDto);
  }

  @Delete('delete/:id')
  async todo_delete(@Req() req: Request, @Param('id') id: string) {
    const user = req.user
    return this.todosService.todo_delete(+id, user['sub']);
  }

}
