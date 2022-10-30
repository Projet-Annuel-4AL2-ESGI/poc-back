import { ApiProperty } from "@nestjs/swagger";

export class CreateExoDto {
  id?: number;

  @ApiProperty()
  title: string;
  @ApiProperty()
  rules: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  exoResponse: string;
  @ApiProperty()
  exoCheck: string;
  @ApiProperty()
  language: string;
}
