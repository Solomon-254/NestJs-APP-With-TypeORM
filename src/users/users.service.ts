import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Userpost } from 'src/userpost/entities/userpost.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.usersRepository.create(createUserDto);
    return await this.usersRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: number): Promise<User | null> {
    return await this.usersRepository.findOneBy({id});
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const result = await this.usersRepository.update(id, updateUserDto);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
    const updatedUser = await this.usersRepository.findOneById(id); // Fetch the updated user
    if (!updatedUser) {
      throw new NotFoundException(`Updated user with ID ${id} not found.`);
    }
    return updatedUser;
  }

  async remove(id: number): Promise<User> {
    // Fetch the user before deletion
    const userToDelete = await this.usersRepository.findOneById(id);
    if (!userToDelete) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
    // Delete the user
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }

    // Return the user data
    return userToDelete;
  }

}
