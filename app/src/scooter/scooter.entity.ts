import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('scooters')
export class Scooter {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  brand: string;

  @Column()
  plate: string;

  @Column()
  mileage: number;

  @CreateDateColumn({ name: 'production_date' })
  productionDate: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @CreateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
