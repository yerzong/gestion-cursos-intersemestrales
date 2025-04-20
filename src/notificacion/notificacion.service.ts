import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notificacion } from './entities/notificacion.entity';
import { CreateNotificacionDto } from './dto/create-notificacion.dto';
import { UpdateNotificacionDto } from './dto/update-notificacion.dto';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Injectable()
export class NotificacionService {
  constructor(
    @InjectRepository(Notificacion)
    private readonly notificacionRepository: Repository<Notificacion>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async findAll(filters?: { usuarioId?: number }): Promise<Notificacion[]> {
    const where: any = {};
    if (filters && filters.usuarioId) {
      where.usuario = { id: filters.usuarioId };
    }
    return await this.notificacionRepository.find({ where, relations: ['usuario'] });
  }

  async findOne(id: number): Promise<Notificacion> {
    const notificacion = await this.notificacionRepository.findOne({ where: { id }, relations: ['usuario'] });
    if (!notificacion) {
      throw new HttpException('Notificación no encontrada', HttpStatus.NOT_FOUND);
    }
    return notificacion;
  }

  async create(createNotificacionDto: CreateNotificacionDto): Promise<Notificacion> {
    const usuario = await this.usuarioRepository.findOne({ where: { id: createNotificacionDto.usuarioId } });
    if (!usuario) {
      throw new HttpException('Usuario no encontrado', HttpStatus.BAD_REQUEST);
    }
    const notificacion = this.notificacionRepository.create({
      mensaje: createNotificacionDto.mensaje,
      usuario,
    });
    return await this.notificacionRepository.save(notificacion);
  }

  async update(id: number, updateNotificacionDto: UpdateNotificacionDto): Promise<Notificacion> {
    const notificacion = await this.findOne(id);
    if (updateNotificacionDto.usuarioId !== undefined) {
      const usuario = await this.usuarioRepository.findOne({ where: { id: updateNotificacionDto.usuarioId } });
      if (!usuario) {
        throw new HttpException('Usuario no encontrado', HttpStatus.BAD_REQUEST);
      }
      notificacion.usuario = usuario;
    }
    Object.assign(notificacion, updateNotificacionDto);
    return await this.notificacionRepository.save(notificacion);
  }

  async remove(id: number): Promise<void> {
    const result = await this.notificacionRepository.delete(id);
    if (result.affected === 0) {
      throw new HttpException('Notificación no encontrada', HttpStatus.NOT_FOUND);
    }
  }
}