export class GetPostLikesDto {
  id: number;
  type: string;
  userId?: number;
  userName?: string;
  title: string;
  description: string;
  likes: number;
  userImage?: string;
  liked: boolean;
  image?: string;
}
