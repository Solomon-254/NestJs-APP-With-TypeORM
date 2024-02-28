import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserprofileDto } from './dto/create-userprofile.dto';
import { UpdateUserprofileDto } from './dto/update-userprofile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserProfile } from './entities/userprofile.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserprofileService {
  constructor(
    @InjectRepository(UserProfile)
    private userProfileRepository: Repository<UserProfile>,
  ) {}
  async create(
    createUserprofileDto: CreateUserprofileDto,
  ): Promise<UserProfile> {
    const newProfile = this.userProfileRepository.create(createUserprofileDto);
    return await this.userProfileRepository.save(newProfile);
  }

  async findAll(): Promise<UserProfile[]> {
    return await this.userProfileRepository.find();
  }

  async findOne(id: number): Promise<UserProfile|null> {
    return await this.userProfileRepository.findOneBy({id})
  }


 async update(id: number, updateUserprofileDto: UpdateUserprofileDto): Promise<UserProfile> {
    const result = await this.userProfileRepository.update(id, updateUserprofileDto);
    if (result.affected === 0) {
      throw new NotFoundException(`User Profile with ID ${id} not found.`);
    }
    const updatedUserProfile = await this.userProfileRepository.findOneById(id); // Fetch the updated user
    if (!updatedUserProfile) {
      throw new NotFoundException(`Updated user profile with ID ${id} not found.`);
    }
    return updatedUserProfile;
  }

  async remove(id: number): Promise<UserProfile> {
    // Fetch the user profile before deletion 
    const userProfileToDelete = await this.userProfileRepository.findOneById(id);
    if (!userProfileToDelete) {
      throw new NotFoundException(`User profile with ID ${id} not found.`);
    }
    // Delete the user profile
    const result = await this.userProfileRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User profile with ID ${id} not found.`);
    }

    // Return the user profile data
    return userProfileToDelete;
  }
}
