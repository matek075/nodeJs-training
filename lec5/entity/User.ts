import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsEmail, Length } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  @Length(1, 255)
  name!: string;

  @Column({ unique: true })
  @IsEmail()
  email!: string;
}
