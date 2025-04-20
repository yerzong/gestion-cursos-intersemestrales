import { Injectable } from '@nestjs/common';
import { CreateCursosAcademiaDto } from './dto/create-cursos-academia.dto';
import { UpdateCursosAcademiaDto } from './dto/update-cursos-academia.dto';

@Injectable()
export class CursosAcademiasService {
  create(createCursosAcademiaDto: CreateCursosAcademiaDto) {
    return 'This action adds a new cursosAcademia';
  }

  findAll() {
    return `This action returns all cursosAcademias`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cursosAcademia`;
  }

  update(id: number, updateCursosAcademiaDto: UpdateCursosAcademiaDto) {
    return `This action updates a #${id} cursosAcademia`;
  }

  remove(id: number) {
    return `This action removes a #${id} cursosAcademia`;
  }
}
