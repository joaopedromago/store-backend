import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import * as config from 'config';
import { config as dotenvConfig } from 'dotenv';

import { AppModule } from 'src/app.module';
import { validateEnvs } from 'src/infrastructure/configs/dotenv.validator';
import { ServerConfig } from 'src/infrastructure/interfaces';
import swagger from 'src/infrastructure/plugins/swagger/swagger';

async function bootstrap() {
  const logger = Logger;

  if (process.env.NODE_ENV !== 'production') {
    dotenvConfig();
  }
  const envs = validateEnvs();

  const serverConfig: ServerConfig = config.get('server');

  const app = await NestFactory.create(AppModule);

  swagger.init(app);

  if (envs.NODE_ENV === 'development') {
    app.enableCors();
  } else {
    app.enableCors({ origin: serverConfig.origin });
    logger.log(`Accepting requests from origin "${serverConfig.origin}"`);
  }

  const port = envs.PORT || serverConfig.port;

  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
