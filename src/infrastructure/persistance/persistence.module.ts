import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MySqlCertificateRepository } from './certificate/certificate.repository';
import { MySqlConfigRepository } from './config/certificate.repository';
import { Certificate } from '../../domain/certificate';
import { Config } from '../../domain/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type :"sqlite",
      database: "certificate.db",
      logging: true,
			autoLoadEntities: true,
      synchronize: true
    }),
    TypeOrmModule.forFeature([ Certificate, Config ])
  ],
  providers: [
    { provide: 'CertificateRepository', useClass: MySqlCertificateRepository },
    { provide: 'ConfigRepository', useClass: MySqlConfigRepository },
  ],
  exports: [
    'CertificateRepository', 'ConfigRepository'
  ]
})
export class PersistenceModule {}
