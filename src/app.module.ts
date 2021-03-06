import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CodeModule } from './code/code.module';
import { config } from './orm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { FollowModule } from './follow/follow.module';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';
import { LikesModule } from './likes/likes.module';
import { CommentModule } from './comment/comment.module';
import { ExoModule } from './exo/exo.module';
import { TimeModule } from './time/time.module';

@Module({
  imports: [
    CodeModule,
    AuthModule,
    TypeOrmModule.forRoot(config),
    UserModule,
    FollowModule,
    PostModule,
    LikesModule,
    CommentModule,
    ExoModule,
    TimeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
