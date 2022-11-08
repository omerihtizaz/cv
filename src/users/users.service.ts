import { Injectable } from '@nestjs/common';
import { Equal, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { error } from 'console';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(name: string, email: string, password: string) {
    console.log(
      'hereere' +
        ' name: ' +
        name +
        ' email: ' +
        email +
        ' password: ' +
        password,
    );
    return this.repo.save(this.repo.create({ name, email, password }));
  }

  async findOne(id: number) {
    if (!id) {
      return null;
    }
    console.log('Number: ', id);
    // id = 1;
    console.log(await this.repo.find());
    console.log(Equal(id));
    var user = await this.repo.findOneBy({ id: Equal(id) });
    console.log(user);
    return user;
  }

  find(email: string) {
    return this.repo.find({ where: { email: Equal(email) } });
  }

  async update(id: number, attrs: Partial<User>) {
    var user = await this.repo.findOneBy({ id: Equal(id) });
    if (!user) {
      throw new Error('No user found with id: ' + id);
    }
    Object.assign(user, attrs);
    console.log(attrs);
    return this.repo.save(user);
  }

  async remove(id: number) {
    var user = await this.repo.findOneBy({ id: Equal(id) });
    if (!user) {
      throw new Error('No user found with id: ' + id);
    }
    return this.repo.remove(user);
  }
}
