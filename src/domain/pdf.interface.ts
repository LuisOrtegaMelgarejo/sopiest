import { CertificateFile } from "./certificate";
 
export interface PdfService {
    generateCertificate(certificate: CertificateFile): Promise<string>;
}