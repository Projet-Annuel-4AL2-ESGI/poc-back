export class GetPostDto {
  id: number;
  type: string;
  userId?: number;
  userName?: string;
  title: string;
  description: string;
  likes: number;
  userImage?: string;
  image?: string;
}
