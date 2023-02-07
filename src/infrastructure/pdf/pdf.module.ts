import { Module } from '@nestjs/common';
import { NestPdfService } from './pdf.service';
 
@Module({
    imports: [
    ],
    providers: [{ provide: 'PdfService', useClass: NestPdfService }],
    exports: ['PdfService']
})
export class PdfModule { };