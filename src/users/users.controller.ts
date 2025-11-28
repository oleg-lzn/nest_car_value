import { Controller, Post, Get, Body, Param, Delete } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post('/signup')
  async createUser(@Body() body: CreateUserDto) {
    const user = await this.usersService.create(body.email, body.password);
    return {
      data: user,
      status: 201,
    };
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: number) {
    return this.usersService.delete(id);
  }
}
