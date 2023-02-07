import { Module } from '@nestjs/common';
import Configs from './configs';
import { validationSchema } from './configs/config.schema';
import { ConfigModule } from '@nestjs/config';
import { InfrastructureModule } from './infrastructure/infrastructure.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: Configs,
      isGlobal: true,
      validationSchema
    }),
    InfrastructureModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
