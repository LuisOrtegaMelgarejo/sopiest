import { Injectable, Logger } from "@nestjs/common";
import { InjectEntityManager } from "@nestjs/typeorm";
import { DeleteResult, EntityManager, UpdateResult } from 'typeorm';
import { CertificateRepository } from "../../../domain/certificate.repository";
import { Certificate } from "../../../domain/certificate";


@Injectable()
export class MySqlCertificateRepository implements CertificateRepository{

    private readonly logger = new Logger(MySqlCertificateRepository.name);

    constructor(@InjectEntityManager() private readonly entityManager: EntityManager) { }

    public async getCertificate(id: number): Promise<Certificate> {
        return this.entityManager.getRepository(Certificate).findOneBy({ id });
    }
    public async saveCertificate(certificate: Partial<Certificate>): Promise<Certificate> {
        return this.entityManager.getRepository(Certificate).save(certificate);
    }

    public async updateCertificate(id: number, certificate: Partial<Certificate>): Promise<UpdateResult>{
        return this.entityManager.createQueryBuilder()
                .update(Certificate)
                .set(certificate)
                .where("id = :id", { id })
                .execute();
    }

    public async deleteCertificate(id: number): Promise<DeleteResult> {
        return this.entityManager.getRepository(Certificate).delete(id);
    }

    public async getCertificates(year: number, month: number): Promise<Certificate[]> {
        return this.entityManager
        .getRepository(Certificate)
        .createQueryBuilder()
        .select()
        .where('month = :month and year = :year', { month, year })
        .getMany();
    }

    public async getMaxId(): Promise<number> {
        const maxId = await this.entityManager
        .getRepository(Certificate)
        .createQueryBuilder('c')
        .select('MAX(c.id) as max')
        .getRawOne();
        return maxId.max;
    }

}