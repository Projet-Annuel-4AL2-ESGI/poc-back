import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CodeModule } from './code/code.module';
import { config } from './orm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { FollowModule } from './follow/follow.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [
    CodeModule,
    TypeOrmModule.forRoot(config),
    UserModule,
    FollowModule,
    PostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
