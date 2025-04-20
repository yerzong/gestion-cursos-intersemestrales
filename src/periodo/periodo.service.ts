import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Periodo, EstadoPeriodo } from './entities/periodo.entity';
import { CreatePeriodoDto } from './dto/create-periodo.dto';
import { UpdatePeriodoDto } from './dto/update-periodo.dto';

@Injectable()
export class PeriodosService {
  constructor(
    @InjectRepository(Periodo)
    private readonly periodoRepository: Repository<Periodo>,
  ) {}

  async findAll(filters: { nombre?: string; estado?: EstadoPeriodo }): Promise<Periodo[]> {
    const where: any = {};
    if (filters.nombre) {
      where.nombre = Like(`%${filters.nombre}%`);
    }
    if (filters.estado) {
      where.estado = filters.estado;
    }
    return await this.periodoRepository.find({ where });
  }

  async findOne(id: number): Promise<Periodo> {
    const periodo = await this.periodoRepository.findOne({ where: { id } });
    if (!periodo) {
      throw new HttpException('Periodo no encontrado', HttpStatus.NOT_FOUND);
    }
    return periodo;
  }

  async create(createPeriodoDto: CreatePeriodoDto): Promise<Periodo> {
    const nuevoPeriodo = this.periodoRepository.create(createPeriodoDto);
    return await this.periodoRepository.save(nuevoPeriodo);
  }

  async update(id: number, updatePeriodoDto: UpdatePeriodoDto): Promise<Periodo> {
    const periodo = await this.findOne(id);
    Object.assign(periodo, updatePeriodoDto);
    return await this.periodoRepository.save(periodo);
  }

  async remove(id: number): Promise<void> {
    const result = await this.periodoRepository.delete(id);
    if (result.affected === 0) {
      throw new HttpException('Periodo no encontrado', HttpStatus.NOT_FOUND);
    }
  }
}