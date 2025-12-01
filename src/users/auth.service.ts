import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string) {
    // see if an email is in use
    const [existingUser] = await this.usersService.find(email);
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }
    // hash the users password
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');

    // create a new user save it

    const user = await this.usersService.create(email, result);
    return user;

    // // return the user
  }
  async signin(email: string, password: string) {
    const [user] = await this.usersService.find(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const isValid = storedHash === hash.toString('hex');

    if (!isValid) {
      throw new ForbiddenException('Forbidden');
    }

    return user;
  }
}
