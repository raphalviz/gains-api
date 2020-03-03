import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { MockDocumentQuery } from '../mocks/document-query.mock';

class MockUserModel {
  users = [
    { username: 'Alice', password: 'hashedPassword123$' },
    { username: 'Bob', password: 'bobsHashedPass' },
  ];

  find() {
    let query = new MockDocumentQuery(this.users);
    return query;
  }
}

describe('Users Controller', () => {
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getModelToken('User'), useClass: MockUserModel },
      ],
    }).compile();

    userService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      let response = await userService.findAll();
      expect(response).toBeInstanceOf(Array);
      expect(response).toHaveLength(2);
    });
  });

  describe('create', () => {
    it('should return a new user', async () => {
      // TODO
    })
  })

});
