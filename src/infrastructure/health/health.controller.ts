import { Controller, Get } from '@nestjs/common';
import { HealthCheckService, MicroserviceHealthIndicator, HealthCheck, HealthCheckResult } from '@nestjs/terminus';
import { Transport } from '@nestjs/microservices';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private microservice: MicroserviceHealthIndicator,
    private configService: ConfigService
  ) {}

  @Get()
  @ApiOperation({ summary: 'HealthCheck status of turbo-inventory-savvy-ms' })
  @ApiResponse({ status: 200, description: 'Successful because the ms its alive' })
  @HealthCheck()
  public async check(): Promise<HealthCheckResult> {
    return this.health.check([
      async () =>
        this.microservice.pingCheck('tcp', {
          transport: Transport.TCP,
          options: { host: 'localhost', port: this.configService.get<number>('app.port') }
        })
    ]);
  }
}
