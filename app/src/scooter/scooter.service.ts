import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { CreateScooterDto } from './dto/create-scooter.dto';
import { getUser } from './interfaces/get-user.interface';
import { Scooter } from './scooter.entity';

@Injectable()
export class ScooterService {
  constructor(
    @InjectRepository(Scooter)
    private scooterRepo: Repository<Scooter>,
  ) {}

  private readonly logger = new Logger(ScooterService.name);

  findByQuery(query: getUser) {
    const {
      id,
      brand,
      plate,
      mileageGt,
      mileageLt,
      productionDateBegin,
      productionDateEnd,
    } = query;
    const where: any = { id, brand, plate };

    if (productionDateBegin || productionDateEnd) {
      if (!(productionDateBegin && productionDateEnd)) {
        throw new HttpException(
          'production date begin and end date must coexist',
          HttpStatus.BAD_REQUEST,
        );
      }
      where.productionDate = Between(productionDateBegin, productionDateEnd);
    }

    if (mileageGt || mileageLt) {
      if (!(mileageGt && mileageLt)) {
        throw new HttpException(
          'mileageGt and mileageLt must coexist',
          HttpStatus.BAD_REQUEST,
        );
      }
      where.mileage = Between(mileageGt, mileageLt);
    }
    return this.scooterRepo.find({ where });
  }

  findAll() {
    return this.scooterRepo.find();
  }

  async create(createScooterDto: CreateScooterDto) {
    const { brand, plate, mileage, productionDate } = createScooterDto;
    const scooter = this.scooterRepo.create();
    scooter.brand = brand;
    scooter.plate = plate;
    scooter.mileage = mileage;
    scooter.productionDate = productionDate;
    return this.scooterRepo.insert(scooter);
  }

  async update(id: number, dto: CreateScooterDto) {
    const scooterToUpdate = await this.scooterRepo.findOneBy({ id });
    if (scooterToUpdate == null) {
      throw new HttpException('id does not exist', HttpStatus.BAD_REQUEST);
    }

    const { brand, plate, mileage, productionDate } = dto;
    scooterToUpdate.brand = brand;
    scooterToUpdate.plate = plate;
    scooterToUpdate.mileage = mileage;
    scooterToUpdate.productionDate = productionDate;
    return this.scooterRepo.save(scooterToUpdate);
  }
}
