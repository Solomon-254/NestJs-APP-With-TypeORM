import { Module } from '@nestjs/common';
import { UserprofileService } from './userprofile.service';
import { UserprofileController } from './userprofile.controller';
import { UserProfile } from './entities/userprofile.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserProfile])],
  controllers: [UserprofileController],
  providers: [UserprofileService],
})
export class UserprofileModule {}
