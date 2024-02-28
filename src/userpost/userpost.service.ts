import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserpostDto } from './dto/create-userpost.dto';
import { UpdateUserpostDto } from './dto/update-userpost.dto';
import { Userpost } from './entities/userpost.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserProfile } from 'src/userprofile/entities/userprofile.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserpostService {
  constructor(
    @InjectRepository(Userpost)
    private userPostRepository: Repository<Userpost>,
  ) {}

  async create(createUserpostDto: CreateUserpostDto): Promise<Userpost> {
    const newPost = this.userPostRepository.create(createUserpostDto);
    
    return await this.userPostRepository.save(newPost);
  }

  async findAll(): Promise<Userpost[]> {
    return await this.userPostRepository.find();
  }

  async findOne(id: number): Promise<Userpost|null> {
    return await this.userPostRepository.findOneBy({id})
  }

  async update(id: number, updateUserpostDto: UpdateUserpostDto): Promise<Userpost> {
    const result = await this.userPostRepository.update(id, updateUserpostDto);
    if (result.affected === 0) {
      throw new NotFoundException(`User post with ID ${id} not found.`);
    }
    const updatedUserPost = await this.userPostRepository.findOneById(id); // Fetch the updated post
    if (!updatedUserPost) {
      throw new NotFoundException(`Updated post with ID ${id} not found.`);
    }
    return updatedUserPost;
  }

 async remove(id: number):Promise<Userpost> {
    // Fetch the user profile before deletion 
    const userPostToDelete = await this.userPostRepository.findOneById(id);
    if (!userPostToDelete) {
      throw new NotFoundException(`User post with ID ${id} not found.`);
    }
    // Delete the user post
    const result = await this.userPostRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User post with ID ${id} not found.`);
    }

    // Return the user post data
    return userPostToDelete;
  }
}
