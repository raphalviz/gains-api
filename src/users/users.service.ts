import { Injectable, HttpException, BadRequestException } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

const saltRounds = 10;

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async hashUserPassword(userDto: CreateUserDto): Promise<any> {
    let hashedPassword = await bcrypt.hash(userDto.password, saltRounds);
    return hashedPassword;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    createUserDto.password = await this.hashUserPassword(createUserDto);
    let newUser = new this.userModel(createUserDto);

    try {
      let createdUser = await newUser.save();
      return createdUser;
    } catch (error) {
      if (error.code === 11000) {
        throw new HttpException('User already exists', 200);
      } else {
        throw new BadRequestException(error);
      }
    }
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findByUsername(username: string): Promise<User> {
    let user = await this.userModel.findOne({ username }).exec();

    if (!user) {
      throw new HttpException('User does not exist', 404);
    }

    return user;
  }
}
