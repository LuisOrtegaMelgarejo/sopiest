import { DeleteResult, UpdateResult } from "typeorm";
import { Certificate } from "./certificate";
 
export interface CertificateRepository {
    getCertificates(year: number, month: number): Promise<Certificate[]>;
    getMaxId(): Promise<number>;
    saveCertificate(certificate: Partial<Certificate>): Promise<Certificate>;
    getCertificate(id: number): Promise<Certificate>;
    updateCertificate(id: number, certificate: Partial<Certificate>): Promise<UpdateResult>;
    deleteCertificate(id: number): Promise<DeleteResult>;
}