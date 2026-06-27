import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global prefix
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  // Security
  app.use(helmet());

  // CORS
  const apiDomain = process.env.API_DOMAIN || 'http://localhost:3000';
  const webDomain = process.env.WEB_DOMAIN || 'http://localhost:4200';

  app.enableCors({
    origin: [apiDomain, webDomain, 'https://vcsinfo.com.br'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Port
  const port = process.env.NX_API_PORT || process.env.PORT || 3000;

  await app.listen(port);

  Logger.log(
    `🚀 API is running on: http://localhost:${port}/${globalPrefix}`,
    'NestApplication',
  );
}

bootstrap().catch(err => {
  Logger.error(err, 'Bootstrap Error');
  process.exit(1);
});
