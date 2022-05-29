import { Inject, Injectable, Logger, Provider } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

import { Observable } from 'rxjs';

import { EventBusPort } from 'src/infrastructure/ports/event-bus.port';

import { KafkaOptions } from './kafka.config';

@Injectable()
export class KafkaAdapter implements EventBusPort<unknown> {
  private readonly logger = new Logger(KafkaAdapter.name);

  constructor(
    @Inject(KafkaOptions.name) private readonly clientKafka: ClientKafka,
  ) {}

  emit<TResult = unknown, TInput = unknown>(
    pattern: unknown,
    data: TInput,
  ): Observable<TResult> {
    this.logger.verbose(
      `Sending kafka message to ${pattern}, data: ${JSON.stringify(data)}`,
    );

    return this.clientKafka.emit<TResult, TInput>(pattern, data);
  }
}

export const KafkaProvider: Provider<EventBusPort<unknown>> = {
  provide: EventBusPort,
  useClass: KafkaAdapter,
};
