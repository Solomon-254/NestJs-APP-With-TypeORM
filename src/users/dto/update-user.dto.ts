import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    //this means the values of create user dto can be 
    // provided for updating or not, if not, the default values will  be retained
}
