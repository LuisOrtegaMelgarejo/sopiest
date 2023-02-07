export class Certificate {
    studentName: string;
    courseName: string;
    teacherCode: string;
    teacherName: string;
    hours: number;
    date: Date;
    serial: string;
}

export interface MakeCertificateRequest {
    studentName: string;
    courseName: string;
    teacherCode: string;
    teacherName: string;
    hours: number;
}

export interface GetCertificateRequest {
    year: string;
    month: string;
    serial: string;
}