import { Test, TestingModule } from '@nestjs/testing';
import { AcademiaService } from './academia.service';

describe('AcademiaService', () => {
  let service: AcademiaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AcademiaService],
    }).compile();

    service = module.get<AcademiaService>(AcademiaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
