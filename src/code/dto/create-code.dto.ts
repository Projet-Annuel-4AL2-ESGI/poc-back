import { ApiProperty } from "@nestjs/swagger";

export class CreateCodeDto {
  @ApiProperty()
  type: string;
  @ApiProperty()
  content: string;
  @ApiProperty()
  userId?: number;
  @ApiProperty()
  exerciseId?: number;
}
