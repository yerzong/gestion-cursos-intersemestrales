import { Test, TestingModule } from '@nestjs/testing';
import { CursosAcademiasService } from './cursos-academias.service';

describe('CursosAcademiasService', () => {
  let service: CursosAcademiasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CursosAcademiasService],
    }).compile();

    service = module.get<CursosAcademiasService>(CursosAcademiasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
