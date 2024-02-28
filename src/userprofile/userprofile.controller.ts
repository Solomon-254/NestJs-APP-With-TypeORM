import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { UserprofileService } from './userprofile.service';
import { CreateUserprofileDto } from './dto/create-userprofile.dto';
import { UpdateUserprofileDto } from './dto/update-userprofile.dto';

@Controller('userprofile')
export class UserprofileController {
  constructor(private readonly userprofileService: UserprofileService) {}

  @Post()
  async create(@Body() createUserprofileDto: CreateUserprofileDto) {
    try {
      const newUserProfile =
        await this.userprofileService.create(createUserprofileDto);
      return {
        message: 'User Profile created successfully',
        user: newUserProfile,
      };
    } catch (error) {
      throw new BadRequestException('Could not create user profile');
    }
  }

  @Get()
  async findAll() {
    const userProfiles = await this.userprofileService.findAll();
    return { message: 'User profiles found successfully', userProfiles };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const user = await this.userprofileService.findOne(+id);
      if (!user) {
        throw new NotFoundException('User Profile not found');
      }
      return { message: 'User found successfully', user };
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserprofileDto: UpdateUserprofileDto,
  ) {
    try {
      const updatedUserProfile = await this.userprofileService.update(
        +id,
        updateUserprofileDto,
      );
      if (!updatedUserProfile) {
        throw new NotFoundException('User Profile not found');
      }
      return {
        message: 'User Profile updated successfully',
        user: updatedUserProfile,
      };
    } catch (error) {
      throw new NotFoundException('User Profile not found');
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const deletedUserProfile = await this.userprofileService.remove(+id);
      if (!deletedUserProfile) {
        throw new NotFoundException('User Profile not found');
      }
      return {
        message: 'User Profile deleted successfully',
        user: deletedUserProfile,
      };
    } catch (error) {
      throw new NotFoundException('User Profile not found');
    }
  }
}
