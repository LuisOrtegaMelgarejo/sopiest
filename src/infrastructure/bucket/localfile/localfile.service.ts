import { Logger } from '@nestjs/common';
import { ReadStream, createReadStream, writeFileSync, mkdirSync, readdirSync } from 'fs';
import { join } from 'path';
import { FileService } from '../../../domain/file.interface';
import { GetCertificateRequest } from '../../../domain/certificate';

export class LocalFileService implements FileService {

    protected logger = new Logger(LocalFileService.name);
    
    constructor() {}

    public getCertificate(certificate: GetCertificateRequest): ReadStream {
        const path = `/uploads/${certificate.year}/${certificate.month}/${certificate.serial}.pdf`
        this.logger.log(`Getting file from ${path}`);
        return createReadStream(join(process.cwd(),path));
    }

    public async getCertificates(year: number, month: number): Promise<string[]> {
        try {
            const subpath = join(process.cwd(), `/uploads/${year}/${month}`);
            return readdirSync(subpath)
        } catch (ex) {
            this.logger.log(`Not found certificates to ${year}/${month}`)
        }
        return [];
    }

    public async getYears(): Promise<string[]> {
        const subpath = join(process.cwd(), `/uploads`);
        const data = readdirSync(subpath);
        return data.filter(data => data !== 'config');
    }

    public async saveCertificate(file: Express.Multer.File, certificate: GetCertificateRequest): Promise<boolean> {
        return this.saveFile(file, `${certificate.year}/${certificate.month}`, `${certificate.serial}.pdf`);
    }

    public async saveConfigFile(file: Express.Multer.File, type: string): Promise<boolean> {
        return this.saveFile(file, `config`, `${type}.png`);
    }

    private async saveFile(file: Express.Multer.File, subpath: string, filename: string): Promise<boolean> {
        return new Promise(async (resolve) => {
            let response = true;
            try {
                mkdirSync(join(process.cwd(),`/uploads/${subpath}`), { recursive: true });
                writeFileSync(join(process.cwd(),`/uploads/${subpath}/${filename}`), file.buffer, { flag: 'w+' });
            } catch (ex) {
                response = false;
                this.logger.error(ex);
            }
            resolve(response)
        })
    }
}