import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("signup")
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

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async profile(@Req() req: Request) {
    const user = req.user
    return this.usersService.findOne(user['sub']);
  }


  @UseGuards(AuthGuard('jwt'))
  @Patch('update')
  async update(@Req() req: Request, @Body() updateUserDto: UpdateUserDto) {
    const user = req.user
    return this.usersService.update(user['sub'], updateUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('delete')
  async remove(@Req() req: Request) {
    const user = req.user
    return this.usersService.remove(user['sub']);
  }

  @UseGuards(AuthGuard('jwt-rt'))
  @Post('refresh')
  async refresh(@Req() req: Request) {
    const user = req.user
    return this.usersService.refreshToken(user["refreshToken"])
  }

}
