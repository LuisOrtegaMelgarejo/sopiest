import { Injectable, Logger } from "@nestjs/common";
import { createWriteStream, mkdirSync } from 'fs';
import { join } from 'path';
import * as PdfPrinter from 'pdfmake';
import { MESES } from "../../domain/constants/months";
import { Certificate } from "../../domain/certificate/certificate";
import { PdfService } from "../../domain/pdf.interface";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class NestPdfService implements PdfService{
    
    protected logger = new Logger(NestPdfService.name);

    constructor(private readonly configService: ConfigService) { }
 
    async generateCertificate(certificate: Certificate): Promise<string> {

        const directory = `${certificate.date.getFullYear()}/${certificate.date.getMonth()}`
        const subpath = join(process.cwd(), `/uploads/${directory}`);
        mkdirSync(subpath, { recursive: true });
        const url = `${this.configService.get('app.url')}${this.configService.get('app.baseContextPath')}/certificate/${directory}/${certificate.serial}`;

        const fonts = {
            Roboto: {
                normal: 'node_modules/roboto-font/fonts/Roboto/roboto-regular-webfont.ttf',
                bold: 'node_modules/roboto-font/fonts/Roboto/roboto-bold-webfont.ttf',
                italics: 'node_modules/roboto-font/fonts/Roboto/roboto-italic-webfont.ttf',
                bolditalics: 'node_modules/roboto-font/fonts/Roboto/roboto-bolditalic-webfont.ttf'
            }
        };
        
        const printer = new PdfPrinter(fonts);
        
        const docDefinition = {
            background: [
                {
                    image: './uploads/config/background.png',
                    width: 842,
                }
            ],
            content: [
                { text: `${MESES[certificate.date.getMonth()]}. ${certificate.date.getDate()} | ${certificate.date.getFullYear()}`, color: '#2d3035', alignment: 'right', fontSize: 15, margin: [0, 0, 0, 0]},
                { text: certificate.studentName, color: '#2d3035', alignment: 'left', fontSize: 35, margin: [30, 205, 0, 35]},
                { text: `Al haber concluido satisfactoriamente ${certificate.hours??0} horas del Curso`, color: '#2d3035', alignment: 'left', fontSize: 12, margin: [25, 10, 0, 0]},
                { text: certificate.courseName, alignment: 'left', color: '#2d3035', fontSize: 12, margin: [25, 0, 0, 50]},
                { 
                    layout: 'noBorders', // optional
                    table: {
                        headerRows: 0,
                        widths: [ 170, 150, 180, 'auto' ],
                        body: [
                            [
                                { image: `./uploads/config/rector.png`, alignment: 'left', fit: [100, 150], margin: [30, 0, 0, 0] },
                                { image: `./uploads/config/${certificate.teacherCode}.png`, alignment: 'center', fit: [100, 150] },
                                {},
                                { qr: url, fit: '70', foreground: '#2d3035', background: 'white', margin: [0, 15, 0, 0]},
                            ],
                            [
                                {},
                                { text: certificate.teacherName, alignment: 'center', color: '#2d3035', fontSize: 13, margin: [0, 10, 0, 0]},
                                {},
                                {},
                            ]
                        ]
                    }
                }
            ],
            defaultStyle: {
                font: 'Roboto'
            },
            pageOrientation: 'landscape'
        };
    
        const pdfDoc = printer.createPdfKitDocument(docDefinition, {});

        pdfDoc.pipe(createWriteStream(`${subpath}/${certificate.serial}.pdf`));
        pdfDoc.end();

        return url;
    }
}