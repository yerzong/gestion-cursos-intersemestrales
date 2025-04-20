import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Curso } from 'src/curso/entities/curso.entity';
import { Academia } from 'src/academia/entities/academia.entity';
import { CursoAcademia } from './entities/cursos-academia.entity';
import { CreateCursoAcademiaDto } from './dto/create-cursos-academia.dto';
import { UpdateCursoAcademiaDto } from './dto/update-cursos-academia.dto';

@Injectable()
export class CursosAcademiasService {
  constructor(
    @InjectRepository(CursoAcademia)
    private readonly cursoAcademiaRepository: Repository<CursoAcademia>,
    @InjectRepository(Curso)
    private readonly cursoRepository: Repository<Curso>,
    @InjectRepository(Academia)
    private readonly academiaRepository: Repository<Academia>,
  ) {}

  async findAll(filters?: { cursoId?: number; academiaId?: number }): Promise<CursoAcademia[]> {
    const where: any = {};
    if (filters) {
      if (filters.cursoId) {
        where.curso = { id: filters.cursoId };
      }
      if (filters.academiaId) {
        where.academia = { id: filters.academiaId };
      }
    }
    return await this.cursoAcademiaRepository.find({ where, relations: ['curso', 'academia'] });
  }

  async findOne(id: number): Promise<CursoAcademia> {
    const registro = await this.cursoAcademiaRepository.findOne({ where: { id }, relations: ['curso', 'academia'] });
    if (!registro) {
      throw new HttpException('Registro no encontrado', HttpStatus.NOT_FOUND);
    }
    return registro;
  }

  async create(createCursoAcademiaDto: CreateCursoAcademiaDto): Promise<CursoAcademia> {
    const curso = await this.cursoRepository.findOne({ where: { id: createCursoAcademiaDto.cursoId } });
    if (!curso) {
      throw new HttpException('Curso no encontrado', HttpStatus.BAD_REQUEST);
    }
    const academia = await this.academiaRepository.findOne({ where: { id: createCursoAcademiaDto.academiaId } });
    if (!academia) {
      throw new HttpException('Academia no encontrada', HttpStatus.BAD_REQUEST);
    }
    const registro = this.cursoAcademiaRepository.create({
      curso,
      academia,
    });
    return await this.cursoAcademiaRepository.save(registro);
  }

  async update(id: number, updateCursoAcademiaDto: UpdateCursoAcademiaDto): Promise<CursoAcademia> {
    const registro = await this.findOne(id);
    if (updateCursoAcademiaDto.cursoId !== undefined) {
      const curso = await this.cursoRepository.findOne({ where: { id: updateCursoAcademiaDto.cursoId } });
      if (!curso) {
        throw new HttpException('Curso no encontrado', HttpStatus.BAD_REQUEST);
      }
      registro.curso = curso;
    }
    if (updateCursoAcademiaDto.academiaId !== undefined) {
      const academia = await this.academiaRepository.findOne({ where: { id: updateCursoAcademiaDto.academiaId } });
      if (!academia) {
        throw new HttpException('Academia no encontrada', HttpStatus.BAD_REQUEST);
      }
      registro.academia = academia;
    }
    return await this.cursoAcademiaRepository.save(Object.assign(registro, updateCursoAcademiaDto));
  }

  async remove(id: number): Promise<void> {
    const result = await this.cursoAcademiaRepository.delete(id);
    if (result.affected === 0) {
      throw new HttpException('Registro no encontrado', HttpStatus.NOT_FOUND);
    }
  }
}