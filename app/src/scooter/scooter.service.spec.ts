/* eslint-disable @typescript-eslint/no-empty-function */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Between } from 'typeorm';
import { Scooter } from './scooter.entity';
import { ScooterService } from './scooter.service';
import { Provider } from '@nestjs/common';
import { CreateScooterDto } from './dto/create-scooter.dto';
import { GetScooterQueryDto } from './dto/get-scooter-query.dto';

describe('ScooterService', () => {
  const mockScooter = new Scooter();
  mockScooter.id = 1;
  mockScooter.brand = 'Yamaha';
  mockScooter.plate = 'CCC-333';
  mockScooter.mileage = 6000;
  mockScooter.productionDate = new Date('2022-12-12');

  const mockScooterRepository: Provider = {
    provide: getRepositoryToken(Scooter),
    useValue: {
      create: jest.fn().mockImplementation(() => new Scooter()),
      find: jest.fn().mockImplementation(() => {}),
      insert: jest.fn().mockImplementation(() => {}),
      findOneBy: jest.fn().mockImplementation(({ id }) => {
        // mock only id == 1 exist in db
        if (id !== 1) return null;
        return mockScooter;
      }),
      save: jest.fn().mockImplementation(() => {}),
    },
  };

  let service: ScooterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScooterService, mockScooterRepository],
    }).compile();

    service = module.get<ScooterService>(ScooterService);
  });

  it('if query against mileageGt and mileageLt, need both to exist', async () => {
    const query = new GetScooterQueryDto();
    query.mileageGt = 100;

    try {
      await service.findByQuery(query);
    } catch (error) {
      expect(error.message).toBe('mileageGt and mileageLt must coexist');
    }
  });

  it('if query against productionDateBegin and productionDateEnd, need both to exist', async () => {
    const query = new GetScooterQueryDto();
    query.productionDateBegin = new Date();
    try {
      await service.findByQuery(query);
    } catch (error) {
      expect(error.message).toBe(
        'production date begin and end date must coexist',
      );
    }
  });

  it('if query valid, repository.find() should be called with correct where clause', async () => {
    const query = new GetScooterQueryDto();
    query.id = 1;
    await service.findByQuery(query);
    expect(mockScooterRepository.useValue.find).toBeCalledWith({
      take: 1000,
      where: {
        id: query.id,
        brand: query.brand,
        plate: query.plate,
      },
    });
    query.mileageGt = 1000;
    query.mileageLt = 2000;

    await service.findByQuery(query);
    expect(mockScooterRepository.useValue.find).toBeCalledWith({
      take: 1000,
      where: {
        id: query.id,
        brand: query.brand,
        plate: query.plate,
        mileage: Between(query.mileageGt, query.mileageLt),
      },
    });
  });

  it('create success', async () => {
    const createScooterDto = new CreateScooterDto();
    createScooterDto.brand = 'Kymco';
    createScooterDto.mileage = 50000;
    createScooterDto.plate = 'ABC-123';
    createScooterDto.productionDate = new Date('2015-01-07');
    await service.create(createScooterDto);
    expect(mockScooterRepository.useValue.insert).toBeCalledWith({
      ...createScooterDto,
    });
  });

  it('if update id not exist, should throw error', async () => {
    const createScooterDto = new CreateScooterDto();
    createScooterDto.brand = 'Kymco';
    createScooterDto.mileage = 50000;
    createScooterDto.plate = 'ABC-123';
    createScooterDto.productionDate = new Date('2015-01-07');
    try {
      await service.update(2, createScooterDto);
    } catch (error) {
      expect(error.message).toBe('id does not exist');
    }
  });

  it('update success', async () => {
    const mockScooterClone = Object.assign({}, mockScooter);
    Object.setPrototypeOf(mockScooterClone, Scooter.prototype);
    mockScooterClone.mileage = 10000;
    await service.update(1, mockScooterClone);
    expect(mockScooterRepository.useValue.save).toBeCalledWith({
      ...mockScooter,
      mileage: 10000,
    });
  });
});
