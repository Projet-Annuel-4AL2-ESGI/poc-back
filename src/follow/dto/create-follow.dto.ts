import { ApiProperty } from "@nestjs/swagger";

export class CreateFollowDto {

  @ApiProperty()
  follower: number;

  @ApiProperty()
  following: number;
}
