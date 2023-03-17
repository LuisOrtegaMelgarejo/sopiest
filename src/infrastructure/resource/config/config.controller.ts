import { Controller, Post, UseInterceptors, UploadedFile, Body, Logger, UseGuards, Get, Param } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { RolesGuard } from "../../guards/roles.guard";
import { CreateConfigRequest } from "../../../domain/config";
import { CertificateService } from "../../../application/certificate/certificate.service";

@Controller("config")
export class ConfigController {

  protected logger = new Logger(ConfigController.name);

  constructor(private readonly certificateService: CertificateService) {}

  @Get("/:type")
  getConfigs(@Param('type') type) {
    return this.certificateService.getConfigs(type);
  }

  @UseGuards(RolesGuard)
  @Post("/")
  @UseInterceptors(FileInterceptor("config"))
  configCertificate(@UploadedFile() file: Express.Multer.File, @Body() params: CreateConfigRequest) {
    return this.certificateService.uploadConfig(file, params);
  }
}
