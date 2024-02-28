import { PartialType } from '@nestjs/mapped-types';
import { CreateUserpostDto } from './create-userpost.dto';

export class UpdateUserpostDto extends PartialType(CreateUserpostDto) {}
