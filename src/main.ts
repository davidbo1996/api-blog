import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import * as helmet from "helmet";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.use(helmet());

	const config = new DocumentBuilder()
		.setTitle("API")
		.setDescription("Test API")
		.setVersion("1.0")
		.addTag("users")
		.build();

	const document = SwaggerModule.createDocument(app, config);

	SwaggerModule.setup("api", app, document);
	await app.listen(3002);
}
bootstrap();
