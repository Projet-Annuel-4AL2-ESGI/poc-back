import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {

  id?: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  username?: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  followers?: number[];

  @ApiProperty()
  image?: string;
}
