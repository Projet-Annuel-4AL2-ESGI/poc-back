import { Body, Controller, Get, Headers, Post, Req, Request, UseGuards } from "@nestjs/common";
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { JwtAuthGuard } from "./guard/jwt-auth.guard";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() req) {
    console.log('controller request post' + req);
    return this.authService.login(req.username);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() request: Request) {
    return request.headers;
  }
}
