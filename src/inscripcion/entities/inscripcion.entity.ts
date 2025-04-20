import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Curso } from 'src/curso/entities/curso.entity';

export enum EstadoInscripcion {
  Inscrito = 'Inscrito',
  Aprobado = 'Aprobado',
  NoAprobado = 'No aprobado',
}

@Entity({ name: 'inscripciones' })
export class Inscripcion {
  @ApiProperty({ description: 'Identificador de la inscripción' })
  @PrimaryGeneratedColumn({ name: 'id_inscripcion' })
  id: number;

  @ApiProperty({ description: 'Fecha de la inscripción', type: String, format: 'date' })
  @Column({ type: 'date' })
  fecha_inscripcion: Date;

  @ApiProperty({ description: 'Estado de la inscripción', enum: EstadoInscripcion, default: EstadoInscripcion.Inscrito })
  @Column({ type: 'enum', enum: EstadoInscripcion, default: EstadoInscripcion.Inscrito })
  estado: EstadoInscripcion;

  @ApiProperty({ description: 'Usuario inscrito' })
  @ManyToOne(() => Usuario, { nullable: false })
  usuario: Usuario;

  @ApiProperty({ description: 'Curso en el que se inscribe' })
  @ManyToOne(() => Curso, { nullable: false })
  curso: Curso;
}