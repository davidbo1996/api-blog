import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerMiddleware } from 'common/middleware/logger.middleware';
import { UsersModule } from './users/users.module';
import { PostsController } from './posts/posts.controller';
import { Posts } from './posts';
import { PostsService } from './posts/posts.service';

@Module({
  imports: [UsersModule, MongooseModule.forRoot('mongodb://localhost/nest')],
  controllers: [PostsController],
  providers: [Posts, PostsService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer
        .apply(LoggerMiddleware)
        .forRoutes('users');
  }
}
