import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, NotFoundException } from '@nestjs/common';
import { UserpostService } from './userpost.service';
import { CreateUserpostDto } from './dto/create-userpost.dto';
import { UpdateUserpostDto } from './dto/update-userpost.dto';

@Controller('userpost')
export class UserpostController {
  constructor(private readonly userpostService: UserpostService) {}

  @Post()
 async create(@Body() createUserpostDto: CreateUserpostDto) {
    try {
      const newUserPost =
        await this.userpostService.create(createUserpostDto);
      return {
        message: 'User Post created successfully',
        user: newUserPost,
      };
    } catch (error) {
      throw new BadRequestException('Could not create post');
    }
  }

  @Get()
 async findAll() {
    const userPost = await this.userpostService.findAll();
    return { message: 'User Posts found successfully', userPost };
  }

  @Get(':id')
 async findOne(@Param('id') id: string) {
    try {
      const post = await this.userpostService.findOne(+id);
      if (!post) {
        throw new NotFoundException('Post not found');
      }
      return { message: 'Post found successfully', post };
    } catch (error) {
      throw new NotFoundException('Post not found');
    }
  }

  @Patch(':id')
 async update(@Param('id') id: string, @Body() updateUserpostDto: UpdateUserpostDto) {
    try {
      const updatedPost = await this.userpostService.update(
        +id,
        updateUserpostDto,
      );
      if (!updatedPost) {
        throw new NotFoundException('Post not found');
      }
      return {
        message: 'Post updated successfully',
        user: updatedPost,
      };
    } catch (error) {
      throw new NotFoundException('Post not found');
    }
  }

  @Delete(':id')
 async remove(@Param('id') id: string) {
    try {
      const deletedPost= await this.userpostService.remove(+id);
      if (!deletedPost) {
        throw new NotFoundException('Post not found');
      }
      return {
        message: 'Post deleted successfully',
        user: deletedPost,
      };
    } catch (error) {
      throw new NotFoundException('Post not found');
    }
  }
}
