import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Sistema de Cursos Intersemestrales')
    .setDescription('API para gestión de periodos, usuarios, cursos, inscripciones, evaluaciones y certificados')
    .setVersion('1.0')
    .addTag('NestJS + MySQL')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
