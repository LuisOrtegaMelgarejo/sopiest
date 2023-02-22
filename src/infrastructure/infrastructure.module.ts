import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { BucketModule } from './bucket/bucket.module';
import { PdfModule } from './pdf/pdf.module';
import { PersistenceModule } from './persistance/persistence.module';
import { CertificateController } from './resource/certificate/certificate.controller';
import { ConfigController } from './resource/config/config.controller';
import { CertificateService } from '../application/certificate/certificate.service';
import { CertificateRepository } from '../domain/certificate.repository';
import { ConfigRepository } from '../domain/config.repository';
import { FileService } from '../domain/file.interface';
import { PdfService } from '../domain/pdf.interface';

const providers = [
  {
    provide: CertificateService,
    useFactory: (
      certificateRepository: CertificateRepository,
      configRepository: ConfigRepository,
      fileService: FileService,
      pdfService: PdfService
    ) => new CertificateService(certificateRepository, configRepository, fileService, pdfService),
    inject: ['CertificateRepository', 'ConfigRepository', 'FileService', 'PdfService']
  }
];

@Module({
imports: [HealthModule, BucketModule, PdfModule, PersistenceModule],
  controllers: [CertificateController, ConfigController],
  providers: [...providers],
  exports: []
})
export class InfrastructureModule {}
