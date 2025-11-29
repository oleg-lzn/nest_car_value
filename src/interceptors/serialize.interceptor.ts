/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface ClassInterface {
  new (...args: any[]): {};
}

export function Serialize(dto: ClassInterface) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    // // Run something before a request is handled by the request handler
    // console.log('I am running before a handler', context);

    return handler.handle().pipe(
      map((data: any) => {
        return plainToInstance(this.dto, data, {
          excludeExtraneousValues: true,
        });
        // // run something before the response is sent out
        // console.log('I am running before a response is sent out', data);
      }),
    );
  }
}
