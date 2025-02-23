import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Define o prefixo "api" para todas as rotas
  app.setGlobalPrefix('api');

  // Configura o CORS para aceitar requisições de qualquer origem
  app.enableCors();

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('Teddy Open Finance - API')
    .setDescription('Documentação da API NestJS')
    .setVersion('1.0')
    .addBearerAuth() // Adiciona suporte para autenticação JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
