import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: 'config' })
export class Config {
    @PrimaryColumn()
    configCode: string;

    @Column()
    configType: number;    

    @Column()
    configName: string;
}