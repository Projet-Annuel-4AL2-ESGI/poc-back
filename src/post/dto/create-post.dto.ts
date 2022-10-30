import { ApiProperty } from "@nestjs/swagger";

export class CreatePostDto {
  id?: number;

  @ApiProperty()
  type: string;
  @ApiProperty()
  userId?: number;
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  likes: number;
  @ApiProperty()
  image?: string;
  @ApiProperty()
  exoId?: number;
}
