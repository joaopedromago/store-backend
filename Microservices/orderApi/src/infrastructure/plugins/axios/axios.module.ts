import { Module } from '@nestjs/common';

import { AxiosProvider } from './axios.service';

@Module({
  providers: [AxiosProvider],
  exports: [AxiosProvider],
})
export class AxiosModule {}
