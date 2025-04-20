import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Curso, EstadoCurso } from './entities/curso.entity';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Periodo } from 'src/periodo/entities/periodo.entity';

@Injectable()
export class CursoService {
  constructor(
    @InjectRepository(Curso)
    private readonly cursoRepository: Repository<Curso>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(Periodo)
    private readonly periodoRepository: Repository<Periodo>,
  ) {}

  async findAll(filters: { nombre?: string; estado?: EstadoCurso }): Promise<Curso[]> {
    const where: any = {};
    if (filters.nombre) {
      where.nombre = Like(`%${filters.nombre}%`);
    }
    if (filters.estado) {
      where.estado = filters.estado;
    }
    return await this.cursoRepository.find({
      where,
      relations: ['jefe_academia', 'instructor', 'periodo'],
    });
  }

  async findOne(id: number): Promise<Curso> {
    const curso = await this.cursoRepository.findOne({ where: { id }, relations: ['jefe_academia', 'instructor', 'periodo'] });
    if (!curso) {
      throw new HttpException('Curso no encontrado', HttpStatus.NOT_FOUND);
    }
    return curso;
  }

  async create(createCursoDto: CreateCursoDto): Promise<Curso> {
    const curso = this.cursoRepository.create(createCursoDto);

    // Asignar jefe de academia si se proporciona
    if (createCursoDto.jefeAcademiaId) {
      const jefe = await this.usuarioRepository.findOne({ where: { id: createCursoDto.jefeAcademiaId } });
      if (!jefe) {
        throw new HttpException('Jefe de academia no encontrado', HttpStatus.BAD_REQUEST);
      }
      curso.jefe_academia = jefe;
    }

    // Asignar instructor si se proporciona
    if (createCursoDto.instructorId) {
      const instructor = await this.usuarioRepository.findOne({ where: { id: createCursoDto.instructorId } });
      if (!instructor) {
        throw new HttpException('Instructor no encontrado', HttpStatus.BAD_REQUEST);
      }
      curso.instructor = instructor;
    }

    // Asignar periodo (obligatorio)
    const periodo = await this.periodoRepository.findOne({ where: { id: createCursoDto.periodoId } });
    if (!periodo) {
      throw new HttpException('Periodo no encontrado', HttpStatus.BAD_REQUEST);
    }
    curso.periodo = periodo;

    return await this.cursoRepository.save(curso);
  }

  async update(id: number, updateCursoDto: UpdateCursoDto): Promise<Curso> {
    const curso = await this.findOne(id);

    // Actualización del jefe de academia si se envía
    if (updateCursoDto.jefeAcademiaId !== undefined) {
      if (updateCursoDto.jefeAcademiaId === null) {
        curso.jefe_academia = null;
      } else {
        const jefe = await this.usuarioRepository.findOne({ where: { id: updateCursoDto.jefeAcademiaId } });
        if (!jefe) {
          throw new HttpException('Jefe de academia no encontrado', HttpStatus.BAD_REQUEST);
        }
        curso.jefe_academia = jefe;
      }
    }

    // Actualización del instructor si se envía
    if (updateCursoDto.instructorId !== undefined) {
      if (updateCursoDto.instructorId === null) {
        curso.instructor = null;
      } else {
        const instructor = await this.usuarioRepository.findOne({ where: { id: updateCursoDto.instructorId } });
        if (!instructor) {
          throw new HttpException('Instructor no encontrado', HttpStatus.BAD_REQUEST);
        }
        curso.instructor = instructor;
      }
    }

    // Actualización del periodo si se envía
    if (updateCursoDto.periodoId !== undefined) {
      const periodo = await this.periodoRepository.findOne({ where: { id: updateCursoDto.periodoId } });
      if (!periodo) {
        throw new HttpException('Periodo no encontrado', HttpStatus.BAD_REQUEST);
      }
      curso.periodo = periodo;
    }

    Object.assign(curso, updateCursoDto);
    return await this.cursoRepository.save(curso);
  }

  async remove(id: number): Promise<void> {
    const result = await this.cursoRepository.delete(id);
    if (result.affected === 0) {
      throw new HttpException('Curso no encontrado', HttpStatus.NOT_FOUND);
    }
  }
}