import { ApiProperty } from "@nestjs/swagger";

export class CreateLikeDto {
  @ApiProperty()
  userId: number;
  @ApiProperty()
  postId: number;
}
