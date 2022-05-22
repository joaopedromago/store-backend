import { Type } from '@nestjs/common';
import { SchemaFactory } from '@nestjs/mongoose';

import { Schema } from 'mongoose';

export class SchemaFactoryWithMethods {
  static createForClass = (target: Type<unknown>): Schema<any> => {
    const schema = SchemaFactory.createForClass(target);
    const proto = target.prototype;
    for (const name of Object.getOwnPropertyNames(proto)) {
      if (name != 'constructor' && typeof proto[name] === 'function') {
        schema.methods[name] = proto[name];
      }
    }
    return schema;
  };
}
