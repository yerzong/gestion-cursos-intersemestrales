import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Certificado } from './entities/certificado.entity';
import { CreateCertificadoDto } from './dto/create-certificado.dto';
import { UpdateCertificadoDto } from './dto/update-certificado.dto';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Curso } from 'src/curso/entities/curso.entity';

@Injectable()
export class CertificadoService {
  constructor(
    @InjectRepository(Certificado)
    private readonly certificadoRepository: Repository<Certificado>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(Curso)
    private readonly cursoRepository: Repository<Curso>,
  ) {}

  async findAll(filters?: { usuarioId?: number; cursoId?: number }): Promise<Certificado[]> {
    const where: any = {};
    if (filters) {
      if (filters.usuarioId) {
        where.usuario = { id: filters.usuarioId };
      }
      if (filters.cursoId) {
        where.curso = { id: filters.cursoId };
      }
    }
    return await this.certificadoRepository.find({ where, relations: ['usuario', 'curso'] });
  }

  async findOne(id: number): Promise<Certificado> {
    const certificado = await this.certificadoRepository.findOne({ where: { id }, relations: ['usuario', 'curso'] });
    if (!certificado) {
      throw new HttpException('Certificado no encontrado', HttpStatus.NOT_FOUND);
    }
    return certificado;
  }

  async create(createCertificadoDto: CreateCertificadoDto): Promise<Certificado> {
    const usuario = await this.usuarioRepository.findOne({ where: { id: createCertificadoDto.usuarioId } });
    if (!usuario) {
      throw new HttpException('Usuario no encontrado', HttpStatus.BAD_REQUEST);
    }
    const curso = await this.cursoRepository.findOne({ where: { id: createCertificadoDto.cursoId } });
    if (!curso) {
      throw new HttpException('Curso no encontrado', HttpStatus.BAD_REQUEST);
    }
    const certificado = this.certificadoRepository.create({
      fecha_emision: createCertificadoDto.fecha_emision,
      url_pdf: createCertificadoDto.url_pdf,
      usuario,
      curso,
    });
    return await this.certificadoRepository.save(certificado);
  }

  async update(id: number, updateCertificadoDto: UpdateCertificadoDto): Promise<Certificado> {
    const certificado = await this.findOne(id);

    if (updateCertificadoDto.usuarioId !== undefined) {
      const usuario = await this.usuarioRepository.findOne({ where: { id: updateCertificadoDto.usuarioId } });
      if (!usuario) {
        throw new HttpException('Usuario no encontrado', HttpStatus.BAD_REQUEST);
      }
      certificado.usuario = usuario;
    }
    if (updateCertificadoDto.cursoId !== undefined) {
      const curso = await this.cursoRepository.findOne({ where: { id: updateCertificadoDto.cursoId } });
      if (!curso) {
        throw new HttpException('Curso no encontrado', HttpStatus.BAD_REQUEST);
      }
      certificado.curso = curso;
    }
    Object.assign(certificado, updateCertificadoDto);
    return await this.certificadoRepository.save(certificado);
  }

  async remove(id: number): Promise<void> {
    const result = await this.certificadoRepository.delete(id);
    if (result.affected === 0) {
      throw new HttpException('Certificado no encontrado', HttpStatus.NOT_FOUND);
    }
  }
}