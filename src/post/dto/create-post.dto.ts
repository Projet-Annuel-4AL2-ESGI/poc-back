import { ApiProperty } from "@nestjs/swagger";

export class CreatePostDto {

  @ApiProperty()
  type: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  likes: number;
  @ApiProperty()
  image: string;
}
