import { Test, TestingModule } from '@nestjs/testing';
import { CursosAcademiasController } from './cursos-academias.controller';
import { CursosAcademiasService } from './cursos-academias.service';

describe('CursosAcademiasController', () => {
  let controller: CursosAcademiasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CursosAcademiasController],
      providers: [CursosAcademiasService],
    }).compile();

    controller = module.get<CursosAcademiasController>(CursosAcademiasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
