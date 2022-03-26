import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { LoggerMiddleware } from "common/middleware/logger.middleware";
import { UsersModule } from "./users/users.module";
import { PostsController } from "./posts/posts.controller";
import { PostsService } from "./posts/posts.service";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
	imports: [
		ConfigModule.forRoot(),
		UsersModule,
		MongooseModule.forRoot(
			`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.n80vm.mongodb.net/api-blog?retryWrites=true&w=majority`
		),
		AuthModule,
	],
	controllers: [AppController, PostsController],
	providers: [AppService, PostsService],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoggerMiddleware).forRoutes("users");
	}
}
