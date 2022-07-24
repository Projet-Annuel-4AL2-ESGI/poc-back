export class CreateUserDto {
  id?: number;
  email: string;
  username?: string;
  password: string;
  followers?: number[];
  image?: string;
}
