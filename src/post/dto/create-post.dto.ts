import { ApiProperty } from "@nestjs/swagger";

export class CreatePostDto {

  @ApiProperty()
  type: string;
  @ApiProperty()
  id?: number;
  @ApiProperty()
  userId?: number;
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  likes: number;
  @ApiProperty()
  image: string;
}
