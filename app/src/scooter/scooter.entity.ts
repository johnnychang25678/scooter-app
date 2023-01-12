import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('scooters')
export class Scooter {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  brand: string;

  @Index({ unique: true })
  @Column()
  plate: string;

  @Column()
  mileage: number;

  @Column({ name: 'production_date' })
  productionDate: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
