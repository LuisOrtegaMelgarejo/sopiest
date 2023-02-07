import { HealthCheckResult, HealthIndicatorResult, MicroserviceHealthIndicator, TerminusModule } from '@nestjs/terminus';
import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { HealthController } from './health.controller';

describe('HealthController', () => {
  let healthController: HealthController;
  const indicator: HealthIndicatorResult = { tcp: { status: 'up' } };
  const result: HealthCheckResult = { details: indicator, error: {}, info: indicator, status: 'ok' };

  const microservice = { pingCheck: jest.fn() };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [TerminusModule, ConfigModule],
      controllers: [HealthController],
      providers: []
    })
      .overrideProvider(MicroserviceHealthIndicator)
      .useValue(microservice)
      .compile();
    healthController = moduleRef.get<HealthController>(HealthController);
  });

  describe('Health Check Status', () => {
    it('Successful because the ms its alive', async () => {
      microservice.pingCheck.mockResolvedValue(indicator);
      const res = await healthController.check();
      expect(microservice.pingCheck).toHaveBeenCalled();
      expect(res).toEqual(result);
    });
  });
});
