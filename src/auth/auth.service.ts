import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async checkPassword(
    plaintextPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    const match = await bcrypt.compare(plaintextPassword, hashedPassword);
    return match;
  }

  async validateUser(username: string, enteredPassword: string): Promise<any> {
    try {
      const user = await this.usersService.findByUsername(username);
      const match = await this.checkPassword(enteredPassword, user.password);

      if (user && match) {
        const { ...result } = user;
        return result;
      }
      return null;
    } catch (err) {
      console.error(err);
    }
  }

  async login(user: any) {
    const { username, _id } = user._doc;
    const payload = { username: username, sub: _id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
