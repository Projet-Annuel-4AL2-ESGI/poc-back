import { PartialType } from '@nestjs/mapped-types';
import { CreateExoDto } from './create-exo.dto';

export class UpdateExoDto extends PartialType(CreateExoDto) {}
