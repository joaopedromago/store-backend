import { Observable } from 'rxjs';

export abstract class EventBusPort<T> {
  emit: (pattern: any, data: T) => Observable<T>;
}
