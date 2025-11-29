import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  repo: Repository<UserEntity>;

  constructor(@InjectRepository(UserEntity) repo: Repository<UserEntity>) {
    this.repo = repo;
  }

  create(body: CreateUserDto) {
    const { email, password } = body;
    const user = this.repo.create({ email, password });
    return this.repo.save(user);
  }

  delete(id: number) {
    return this.repo.delete(id);
  }
}
