import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { LoggerMiddleware } from "common/middleware/logger.middleware";
import { UsersModule } from "./users/users.module";
import { PostsController } from "./posts/posts.controller";
import { PostsService } from "./posts/posts.service";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";

@Module({
	imports: [
		ConfigModule.forRoot(),
		UsersModule,
		MongooseModule.forRoot(
			`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.n80vm.mongodb.net/api-blog?retryWrites=true&w=majority`
		),
	],
	controllers: [PostsController],
	providers: [PostsService],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoggerMiddleware).forRoutes("users");
	}
}
