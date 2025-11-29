import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Delete,
  Patch,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';

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
  async deleteUser(@Param('id') id: string) {
    await this.usersService.remove(parseInt(id));
    return {
      status: 200,
      message: 'User deleted successfully',
    };
  }

  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.usersService.findOne(parseInt(id));
    return {
      status: 200,
      data: user, // need to delete pasword from here
      message: 'User found successfully',
    };
  }

  @Get('/')
  async findAllUsers(@Query('email') email: string) {
    const users = await this.usersService.find(email);
    return {
      status: 200,
      data: users, // need to delete pasword from here
      message: 'Users found successfully',
    };
  }

  @Patch('/:id')
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    const updated = await this.usersService.update(parseInt(id), body);
    return {
      status: 200,
      data: updated, // need to delete pasword from here
      message: 'User updated successfully',
    };
  }
}
