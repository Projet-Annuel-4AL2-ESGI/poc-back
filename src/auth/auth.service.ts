import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    console.log('DANS VALIDATE USER');
    const user = await this.userService.findByMail(username);
    const isPassValid = await bcrypt.compare(pass, user.password);
    console.log(isPassValid);
    if (isPassValid) {
      const { password, username, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const userLogged = await this.userService.findByMail(user);
    console.log(user);
    const payload = { name: userLogged.username, id: userLogged.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
