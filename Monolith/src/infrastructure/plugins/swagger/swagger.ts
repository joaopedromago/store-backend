import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

function init(app: INestApplication): void {
  const options = new DocumentBuilder()
    .setTitle('Tabacconist Beckend')
    .setDescription("Your best tabacco's shop even for illegal things")
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
}

export default {
  init,
};
