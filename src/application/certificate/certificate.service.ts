import { Logger } from '@nestjs/common';
import { CertificateRepository } from '../../domain/certificate.repository';
import { ConfigRepository } from '../../domain/config.repository';
import { GetCertificateRequest, MakeCertificateRequest } from '../../domain/certificate';
import { CreateConfigRequest } from '../../domain/config';
import { FileService } from '../../domain/file.interface';
import { PdfService } from '../../domain/pdf.interface';
import { MESES } from '../../domain/constants/months';

export class CertificateService {
    
    protected logger = new Logger(CertificateService.name);
    
    constructor(
        private readonly certificateRepository: CertificateRepository,
        private readonly configRepository: ConfigRepository,
        private readonly fileService: FileService,
        private readonly pdfService: PdfService
    ) {}

    public async listCountByYearAndMonth(){
        const years = await this.fileService.getYears();
        return Promise.all(years.map(async y => {
            const detalle = await Promise.all([...Array(12).keys()].map(async m => {
                const certificates = await this.certificateRepository.getCertificates(parseInt(y), m);
                return { mes: MESES[m], detalle: certificates };
            }));
            return { anno: y, detalle };
        }));
    }
    
    public getCertificate(certificate: GetCertificateRequest) {
        return this.fileService.getCertificate(certificate);
    }

    public async makeCertificate(params: MakeCertificateRequest) {
        const date = new Date();
        const dateInfo = {
            day: date.getDate(),
            month: date.getMonth(),
            year: date.getFullYear()
        }
        const maxIdEmitted = await this.certificateRepository.getMaxId();
        const currentId = params.customId ? params.customId: ((maxIdEmitted ? maxIdEmitted : 7885) + 1);
        const teacherInfo = await this.configRepository.getConfig(params.teacherCode);
        const url = await this.pdfService.generateCertificate({
            ...params,
            ...dateInfo,
            teacherName: teacherInfo.configName, 
            serial: (currentId).toString().padStart(5, '0')
        });
        return this.certificateRepository.saveCertificate({ id: currentId, ...params, ...dateInfo, url})
    }

    public async deleteCertificate(id: number) {
        return this.certificateRepository.deleteCertificate(id);
    }

    public async getConfigs(type: string) {
        return this.configRepository.getConfigByType(type);
    }

    public async uploadCertificate(file: Express.Multer.File, certificate: GetCertificateRequest) {
        return this.fileService.saveCertificate(file, certificate);
    }

    public async uploadConfig(file: Express.Multer.File, params: CreateConfigRequest) {
        const success = this.fileService.saveConfigFile(file, params.configCode);
        if(success) {
            return this.configRepository.saveConfig(params);
        }
    }

}