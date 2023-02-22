import { Injectable, Logger } from "@nestjs/common";
import { InjectEntityManager } from "@nestjs/typeorm";
import { EntityManager } from 'typeorm';
import { ConfigRepository } from "../../../domain/config.repository";
import { Config } from "../../../domain/config";


@Injectable()
export class MySqlConfigRepository implements ConfigRepository {

    private readonly logger = new Logger(MySqlConfigRepository.name);

    constructor(@InjectEntityManager() private readonly entityManager: EntityManager) { }

    public async getConfig(configCode: string): Promise<Config> {
        return this.entityManager
        .getRepository(Config)
        .createQueryBuilder()
        .select()
        .where('configCode = :configCode', { configCode })
        .getOne();
    }

    public async saveConfig(config: Partial<Config>): Promise<Config> {
        return this.entityManager.getRepository(Config).save(config);
    }

}