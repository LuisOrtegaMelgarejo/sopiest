import { Controller, Get, Post, UseInterceptors, UploadedFile, Body, Param, Header, StreamableFile, Logger, UseGuards, NotFoundException } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { RolesGuard } from "../../../infrastructure/guards/roles.guard";
import { GetCertificateRequest, MakeCertificateRequest } from "../../../domain/certificate";
import { CertificateService } from "../../../application/certificate/certificate.service";

@Controller("certificate")
export class CertificateController {

  protected logger = new Logger(CertificateController.name);

  constructor(private readonly certificateService: CertificateService) {}

  @Get("/list")
  listCountByYearAndMonth(){
    return this.certificateService.listCountByYearAndMonth();
  }

  @Get("/:year/:month/:serial")
  @Header('Content-Type', 'application/pdf')
  getCertificate(@Param('year') year, @Param('month') month, @Param('serial') serial){
    const pdf = this.certificateService.getCertificate({ year, month, serial});
    pdf.on('error', function(err) {
      console.log('Not found');
    });
    return new StreamableFile(pdf);
  }

  @UseGuards(RolesGuard)
  @Post("make")
  @UseInterceptors(FileInterceptor("certificate"))
  makeCertificate(@Body() params: MakeCertificateRequest) {
    return this.certificateService.makeCertificate(params);
  }

  @UseGuards(RolesGuard)
  @Post("upload")
  @UseInterceptors(FileInterceptor("certificate"))
  uploadCertificate(@UploadedFile() file: Express.Multer.File, @Body() params: GetCertificateRequest) {
    return this.certificateService.uploadCertificate(file, params);
  }

}
