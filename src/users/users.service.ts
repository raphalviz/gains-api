import { Injectable, HttpException } from '@nestjs/common';
import { USERS } from '../mocks/users.mock';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  users = USERS;

  create(user: User) {
    this.users.push(user);
  }

  findAll(): User[] {
    return this.users;
  }

  findById(userId: any): Promise<any> {
    let id = userId;
    return new Promise(resolve => {
      const user = this.users.find(user => user.id === id);
      if (!user) {
        throw new HttpException('User does not exist.', 404);
      }
      resolve(user);
    });
  }
}
