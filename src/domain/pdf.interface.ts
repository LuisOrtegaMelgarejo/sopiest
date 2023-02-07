import { Certificate } from "./certificate/certificate";
 
export interface PdfService {
    generateCertificate(certificate: Certificate): Promise<string>;
}