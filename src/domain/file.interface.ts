import { ReadStream } from "fs";
import { GetCertificateRequest } from "./certificate";

export interface FileService {
    getCertificate(certificate: GetCertificateRequest): ReadStream;
    getCertificates(year: number, month: number): Promise<string[]>;
    getYears(): Promise<string[]>;
    saveCertificate(file: Express.Multer.File, certificate: GetCertificateRequest): Promise<boolean>;
    saveConfigFile(file: Express.Multer.File, type: string): Promise<boolean>;
}