import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { CreateAcademiaDto } from './dto/create-academia.dto';
import { UpdateAcademiaDto } from './dto/update-academia.dto';
import { Academia } from './entities/academia.entity';

@Injectable()
export class AcademiaService {
  constructor(
    @InjectRepository(Academia)
    private readonly academiaRepository: Repository<Academia>,
  ) {}

  async findAll(filters: { codigo?: string; nombre?: string }): Promise<Academia[]> {
    const where: any = {};
    if (filters.codigo) {
      where.codigo = Like(`%${filters.codigo}%`);
    }
    if (filters.nombre) {
      where.nombre = Like(`%${filters.nombre}%`);
    }
    return await this.academiaRepository.find({ where });
  }

  async findOne(id: number): Promise<Academia> {
    const academia = await this.academiaRepository.findOne({ where: { id } });
    if (!academia) {
      throw new HttpException('Academia no encontrada', HttpStatus.NOT_FOUND);
    }
    return academia;
  }

  async create(createAcademiaDto: CreateAcademiaDto): Promise<Academia> {
    const exists = await this.academiaRepository.findOne({ where: { codigo: createAcademiaDto.codigo } });
    if (exists) {
      throw new HttpException('Código de academia ya existe', HttpStatus.BAD_REQUEST);
    }
    const newAcademia = this.academiaRepository.create(createAcademiaDto);
    return await this.academiaRepository.save(newAcademia);
  }

  async update(id: number, updateAcademiaDto: UpdateAcademiaDto): Promise<Academia> {
    const academia = await this.findOne(id);
    Object.assign(academia, updateAcademiaDto);
    return await this.academiaRepository.save(academia);
  }

  async remove(id: number): Promise<void> {
    const result = await this.academiaRepository.delete(id);
    if (result.affected === 0) {
      throw new HttpException('Academia no encontrada', HttpStatus.NOT_FOUND);
    }
  }
}