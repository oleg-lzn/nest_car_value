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

  find(email: string) {
    return this.repo.find({ where: { email } });
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  async update(id: number, attr: Partial<UserEntity>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new Error('User not found');
    }
    const updated = Object.assign(user, attr);
    const result = await this.repo.save(updated);

    return result;
  }
  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new Error('User not found');
    }
    const deleted = await this.repo.remove(user);
    return deleted;
  }
}
