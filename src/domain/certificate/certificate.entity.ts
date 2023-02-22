import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: 'certificate' })
export class Certificate {

    @PrimaryColumn()
    id: number

    @Column()
    studentName: string;
    
    @Column()
    courseName: string;

    @Column()
    teacherCode: string;

    @Column()
    hours: number;

    @Column()
    day: number;

    @Column()
    month: number;

    @Column()
    year: number;

    @Column()
    url: string;

}