export interface MakeCertificateRequest {
    logoCode: string;
    rectorCode: string;
    date: string;
    studentName: string;
    courseName: string;
    teacherCode: string;
    hours: number;
    customId?: number;
}

export interface GetCertificateRequest {
    year: string;
    month: string;
    serial: string;
}

export interface GetCertificateRequest {
    year: string;
    month: string;
    serial: string;
}