import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);
@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}
  async signup(name: string, email: string, password: string) {
    var user = await this.userService.find(email);
    if (user.length) {
      throw new BadRequestException('Email already exist');
    }
    console.log(name + '___' + email + '___' + password);
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const password_ = salt + '.' + hash.toString('hex');

    return await this.userService.create(name, email, password_);
  }
  async signin(email: string, password: string) {
    const [user] = await this.userService.find(email);

    if (!user) {
      throw new NotFoundException(
        'Email or Password incorrect. Please try again',
      );
    }

    const [salt, storedhash] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    if (storedhash === hash.toString('hex')) {
      console.log('Passwords Match!!');
      return user;
    } else {
      throw new NotFoundException(
        'Email or Password incorrect. Please try again',
      );
    }
  }
}
