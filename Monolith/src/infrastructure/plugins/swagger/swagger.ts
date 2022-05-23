import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

function init(app: INestApplication): void {
  const options = new DocumentBuilder()
    .setTitle('Store Backend')
    .setDescription("Your best shop to spend all your money")
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
}

export default {
  init,
};
