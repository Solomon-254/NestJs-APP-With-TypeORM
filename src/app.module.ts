import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { UserprofileModule } from './userprofile/userprofile.module';
import { UserProfile } from './userprofile/entities/userprofile.entity';
import { UserpostModule } from './userpost/userpost.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '8047',
      database: 'naki',
      synchronize: true, //not adviced in prod env
      retryAttempts: 10,
      retryDelay:3000,
      autoLoadEntities: true, //auto loads all the entities
      migrations: [],
      migrationsTableName: "custom_migration_table"
    }),
    UsersModule,
    UserprofileModule,
    UserpostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
