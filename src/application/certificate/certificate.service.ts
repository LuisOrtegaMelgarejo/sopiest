import { Logger } from '@nestjs/common';
import { GetCertificateRequest, MakeCertificateRequest } from '../../domain/certificate/certificate';
import { FileService } from '../../domain/file.interface';
import { PdfService } from '../../domain/pdf.interface';
import { MESES } from 'src/domain/constants/months';

export class CertificateService {
    
    protected logger = new Logger(CertificateService.name);
    
    constructor(
        private readonly fileService: FileService,
        private readonly pdfService: PdfService
    ) {}

    public async listCountByYearAndMonth(){
        const years = await this.fileService.getYears();
        return Promise.all(years.map(async y => {
            const detalle = await Promise.all([...Array(12).keys()].map(async m => {
                const certificates = await this.fileService.getCertificates(parseInt(y), m);
                return { mes: MESES[m], cantidad: certificates.length };
            }));
            return { anno: y, detalle };
        }));
    }
    
    public getCertificate(certificate: GetCertificateRequest) {
        return this.fileService.getCertificate(certificate);
    }

    public async makeCertificate(params: MakeCertificateRequest) {
        const date = new Date();
        const quantityCertificates = await this.fileService.getCertificates(date.getFullYear(), date.getMonth());
        return this.pdfService.generateCertificate({...params, 
            serial: (quantityCertificates.length+1).toString().padStart(5, '0'),
            date
        });
    }

    public async uploadCertificate(file: Express.Multer.File, certificate: GetCertificateRequest) {
        return this.fileService.saveCertificate(file, certificate);
    }

    public async uploadConfig(file: Express.Multer.File, type: string) {
        return this.fileService.saveConfigFile(file, type);
    }

}