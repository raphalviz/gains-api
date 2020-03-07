import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { MockDocumentQuery } from '../mocks/document-query.mock';
import { USERS } from '../mocks/users.mock';

class MockUserModel {
  user: object;
  users: object[] = USERS;

  constructor(user: any) {
    this.user = user;
  }

  find() {
    let query = new MockDocumentQuery(this.users);
    return query;
  }

  save() {
    this.users.push(this.user);
    return this.user;
  }
}

describe('Users Controller', () => {
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken('User'),
          useClass: MockUserModel,
        },
      ],
    }).compile();

    userService = module.get<UsersService>(UsersService);
  });

  it('should be defined', async () => {
    expect(userService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      let response = await userService.findAll();
      expect(response).toBeInstanceOf(Array);
      expect(response).toHaveLength(2);
    });
  });
});
