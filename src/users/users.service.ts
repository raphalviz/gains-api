import { Injectable, HttpException } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    let newUser = new this.userModel(createUserDto);

    try {
      let createdUser = await newUser.save();
      console.log(createdUser);
      return createdUser;
    } catch (error) {
      if (error.code === 11000) {
        throw new HttpException('User already exists', 200);
      }
    }
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findById(userId: any): Promise<User> {
    let id = userId;

    let user = await this.userModel.findById(id).exec();

    if (!user) {
      throw new HttpException('User does not exist', 404);
    }

    return user;
  }
}
