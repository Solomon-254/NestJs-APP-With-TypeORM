import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, NotFoundException, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const newUser = await this.usersService.create(createUserDto);
      return { message: 'User created successfully', user: newUser };
    } catch (error) {
      throw new BadRequestException('Could not create user');
    }
  }

  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    return { message: 'Users found successfully', users };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const user = await this.usersService.findOne(+id);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return { message: 'User found successfully', user };
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const updatedUser = await this.usersService.update(+id, updateUserDto);
      if (!updatedUser) {
        throw new NotFoundException('User not found');
      }
      return { message: 'User updated successfully', user: updatedUser };
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const deletedUser = await this.usersService.remove(+id);
      if (!deletedUser) {
        throw new NotFoundException('User not found');
      }
      return { message: 'User deleted successfully', user: deletedUser };
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }
}
