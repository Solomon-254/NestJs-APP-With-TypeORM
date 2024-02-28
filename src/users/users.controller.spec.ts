import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository, // Use this or mock your repository
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        regNumber: "TCH211-F112/2024",
        firstName: "Lisa",
        lastName: "Monjiroxxx",
        age: 18,
        isActive: false
      };
      const newUser = { /* provide created user data here */ };
      jest.spyOn(service, 'create').mockResolvedValue(newUser as never);

      const result = await controller.create(createUserDto);
      expect(result).toEqual({ message: 'User created successfully', user: newUser });
    });

    it('should throw BadRequestException if create fails', async () => {
      jest.spyOn(service, 'create').mockRejectedValue(new Error());

      await expect(controller.create({} as CreateUserDto)).rejects.toThrowError(BadRequestException);
    });
  });

  // describe('findAll', () => {
  //   it('should return an array of users', async () => {
  //     const users = [{ /* user1 data */ }, { /* user2 data */ }];
  //     jest.spyOn(service, 'findAll').mockResolvedValue(users as never);

  //     const result = await controller.findAll();
  //     expect(result).toEqual({ message: 'Users found successfully', users });
  //   });
  // });

  // describe('findOne', () => {
  //   it('should return a user by id', async () => {
  //     const user = { /* provide user data */ };
  //     jest.spyOn(service, 'findOne').mockResolvedValue(user as never);

  //     const result = await controller.findOne('1');
  //     expect(result).toEqual({ message: 'User found successfully', user });
  //   });

  //   it('should throw NotFoundException if user is not found', async () => {
  //     jest.spyOn(service, 'findOne').mockResolvedValue(undefined);

  //     await expect(controller.findOne('1')).rejects.toThrowError(NotFoundException);
  //   });
  // });

  // describe('update', () => {
  //   it('should update a user', async () => {
  //     const updatedUserDto: UpdateUserDto = { /* provide updated user data here */ };
  //     const updatedUser = { /* provide updated user data here */ };
  //     jest.spyOn(service, 'update').mockResolvedValue(updatedUser as never);

  //     const result = await controller.update('1', updatedUserDto);
  //     expect(result).toEqual({ message: 'User updated successfully', user: updatedUser });
  //   });

  //   it('should throw NotFoundException if user is not found', async () => {
  //     jest.spyOn(service, 'update').mockResolvedValue(undefined);

  //     await expect(controller.update('1', {} as UpdateUserDto)).rejects.toThrowError(NotFoundException);
  //   });
  // });

  // describe('remove', () => {
  //   it('should remove a user', async () => {
  //     const deletedUser = { /* provide deleted user data here */ };
  //     jest.spyOn(service, 'remove').mockResolvedValue(deletedUser as never);

  //     const result = await controller.remove('1');
  //     expect(result).toEqual({ message: 'User deleted successfully', user: deletedUser });
  //   });

  //   it('should throw NotFoundException if user is not found', async () => {
  //     jest.spyOn(service, 'remove').mockResolvedValue(undefined);

  //     await expect(controller.remove('1')).rejects.toThrowError(NotFoundException);
  //   });
  // });
});
