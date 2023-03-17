import { DeleteResult } from "typeorm";
import { Certificate } from "./certificate";
 
export interface CertificateRepository {
    getCertificates(year: number, month: number): Promise<Certificate[]>;
    getMaxId(): Promise<number>;
    saveCertificate(certificate: Partial<Certificate>): Promise<Certificate>;
    deleteCertificate(id: number): Promise<DeleteResult>;
}