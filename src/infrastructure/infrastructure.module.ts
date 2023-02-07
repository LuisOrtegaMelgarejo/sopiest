import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { BucketModule } from './bucket/bucket.module';
import { PdfModule } from './pdf/pdf.module';
import { CertificateController } from './resource/certificate/certificate.controller';
import { CertificateService } from '../application/certificate/certificate.service';
import { FileService } from '../domain/file.interface';
import { PdfService } from '../domain/pdf.interface';

const providers = [
  {
    provide: CertificateService,
    useFactory: (
      fileService: FileService,
      pdfService: PdfService
    ) => new CertificateService(fileService, pdfService),
    inject: ['FileService', 'PdfService']
  }
];

@Module({
imports: [HealthModule, BucketModule, PdfModule],
  controllers: [CertificateController],
  providers: [...providers],
  exports: []
})
export class InfrastructureModule {}
