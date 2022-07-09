import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtStrategy } from "../auth/strategy/jwt.strategy";
import { PassportModule } from "@nestjs/passport";
import { Follow } from "../follow/entities/follow.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User]), TypeOrmModule.forFeature([Follow])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
