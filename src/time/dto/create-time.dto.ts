import { ApiProperty } from "@nestjs/swagger";

export class CreateTimeDto {
  id?: number;
  @ApiProperty()
  userId: number;
  @ApiProperty()
  exerciseId: number;
  @ApiProperty()
  time: number;
}
