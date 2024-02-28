import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User), //gets the token that represnent the repo injectd
          useClass: Repository, //mocks the UserRepository
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const newUser =  {
        "regNumber": "TCH211-F112/2024",
        "firstName": "Lisa",
        "lastName": "Monjiro",
        "age": 18,
        "isActive": false
    };
      jest.spyOn(repository, 'create').mockReturnValue(newUser as never);
      jest.spyOn(repository, 'save').mockResolvedValue(newUser as never);

      const result = await service.create(newUser as never);
      expect(result).toEqual(newUser);
    });
  });

  // describe('findAll', () => {
  //   it('should return an array of users', async () => {
  //     const users = [{ /* user1 data */ }, { /* user2 data */ }];
  //     jest.spyOn(repository, 'find').mockResolvedValue(users as never);

  //     const result = await service.findAll();
  //     expect(result).toEqual(users);
  //   });
  // });

  // describe('findOne', () => {
  //   it('should return a user by id', async () => {
  //     const user = { /* provide user data */ };
  //     jest.spyOn(repository, 'findOne').mockResolvedValue(user as never);

  //     const result = await service.findOne(1);
  //     expect(result).toEqual(user);
  //   });

  //   it('should throw NotFoundException if user is not found', async () => {
  //     jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

  //     await expect(service.findOne(1)).rejects.toThrowError(NotFoundException);
  //   });
  // });

  // describe('update', () => {
  //   it('should update a user', async () => {
  //     const updatedUser = { /* provide updated user data here */ };
  //     jest.spyOn(repository, 'update').mockResolvedValue({ affected: 1 } as never);
  //     jest.spyOn(repository, 'findOneById').mockResolvedValue(updatedUser as never);

  //     const result = await service.update(1, updatedUser);
  //     expect(result).toEqual(updatedUser);
  //   });

  //   it('should throw NotFoundException if user is not found', async () => {
  //     jest.spyOn(repository, 'update').mockResolvedValue({ affected: 0 } as never);

  //     await expect(service.update(1, {})).rejects.toThrowError(NotFoundException);
  //   });
  // });

  // describe('remove', () => {
  //   it('should remove a user', async () => {
  //     const userToDelete = { /* provide user data */ };
  //     jest.spyOn(repository, 'findOneById').mockResolvedValue(userToDelete as never);
  //     jest.spyOn(repository, 'delete').mockResolvedValue({ affected: 1 } as never);

  //     const result = await service.remove(1);
  //     expect(result).toEqual(userToDelete);
  //   });

  //   it('should throw NotFoundException if user is not found', async () => {
  //     jest.spyOn(repository, 'findOneById').mockResolvedValue(undefined);

  //     await expect(service.remove(1)).rejects.toThrowError(NotFoundException);
  //   });

  //   it('should throw NotFoundException if deletion fails', async () => {
  //     jest.spyOn(repository, 'findOneById').mockResolvedValue({ /* provide user data */ } as never);
  //     jest.spyOn(repository, 'delete').mockResolvedValue({ affected: 0 } as never);

  //     await expect(service.remove(1)).rejects.toThrowError(NotFoundException);
  //   });
  // });


});
