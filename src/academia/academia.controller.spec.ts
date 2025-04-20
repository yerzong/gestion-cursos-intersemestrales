import { Test, TestingModule } from '@nestjs/testing';
import { AcademiaController } from './academia.controller';
import { AcademiaService } from './academia.service';

describe('AcademiaController', () => {
  let controller: AcademiaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AcademiaController],
      providers: [AcademiaService],
    }).compile();

    controller = module.get<AcademiaController>(AcademiaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
