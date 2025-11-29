import { Controller, Post, Get, Body, Param, Delete } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post('/signup')
  async createUser(@Body() body: CreateUserDto) {
    const user = await this.usersService.create(body);
    return {
      data: user,
      status: 201,
      message: 'User created successfully',
    };
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: number) {
    await this.usersService.delete(id);
    return {
      status: 200,
      message: 'User deleted successfully',
    };
  }
}
