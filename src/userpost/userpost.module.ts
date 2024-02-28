import { Module } from '@nestjs/common';
import { UserpostService } from './userpost.service';
import { UserpostController } from './userpost.controller';
import { Userpost } from './entities/userpost.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Userpost])],
  controllers: [UserpostController],
  providers: [UserpostService],
})
export class UserpostModule {}
