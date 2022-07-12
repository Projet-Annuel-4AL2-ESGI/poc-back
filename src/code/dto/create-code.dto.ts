import { ApiProperty } from "@nestjs/swagger";

export class CreateCodeDto {
  @ApiProperty()
  type: string;
  
  @ApiProperty()
  content: string;
}
