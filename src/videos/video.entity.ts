import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Video {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title: string;
    @Column()
    description: string;
    @Column()
    duration: string
    @Column()
    genre: string;
    @Column()
    tags: string;
}
