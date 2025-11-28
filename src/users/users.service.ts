import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {
  repo: Repository<UserEntity>;

  constructor(@InjectRepository(UserEntity) repo: Repository<UserEntity>) {
    this.repo = repo;
  }

  create(email: string, password: string) {
    const user = this.repo.create({ email, password });
    return this.repo.save(user);
  }

  delete(id: number) {
    return this.repo.delete(id);
  }
}
