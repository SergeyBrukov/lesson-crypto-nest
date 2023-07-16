import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ConfigService } from "@nestjs/config";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("/api");
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe())

  const configService = app.get(ConfigService);
  const port = configService.get("port");

  const config = new DocumentBuilder()
    .setTitle("Example")
    .setDescription("The Example API description")
    .setVersion("1.0")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/docs", app, document);
  await app.listen(port);
}

bootstrap();
