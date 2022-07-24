export class CreatePostDto {
  id?: number;
  type: string;
  userId?: number;
  title: string;
  description: string;
  likes: number;
  image?: string;
  exoId?: number;
}
