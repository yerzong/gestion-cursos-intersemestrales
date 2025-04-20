import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Periodo } from 'src/periodo/entities/periodo.entity';

export enum EstadoCurso {
  Pendiente = 'Pendiente',
  Aprobado = 'Aprobado',
  Rechazado = 'Rechazado',
}

@Entity({ name: 'cursos' })
export class Curso {
  @ApiProperty({ description: 'Identificador del curso' })
  @PrimaryGeneratedColumn({ name: 'id_curso' })
  id: number;

  @ApiProperty({ description: 'Nombre del curso', maxLength: 100 })
  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @ApiProperty({ description: 'Aula del curso', maxLength: 50, required: false })
  @Column({ type: 'varchar', length: 50, nullable: true })
  aula?: string;

  @ApiProperty({ description: 'Horario', maxLength: 50, required: false })
  @Column({ type: 'varchar', length: 50, nullable: true })
  horario?: string;

  @ApiProperty({ description: 'Fecha de inicio', type: String, format: 'date' })
  @Column({ type: 'date' })
  fecha_inicio: Date;

  @ApiProperty({ description: 'Fecha de fin', type: String, format: 'date' })
  @Column({ type: 'date' })
  fecha_fin: Date;

  @ApiProperty({ description: 'Estado del curso', enum: EstadoCurso })
  @Column({ type: 'enum', enum: EstadoCurso })
  estado: EstadoCurso;

  @ApiProperty({ description: 'Observaciones', required: false })
  @Column({ type: 'text', nullable: true })
  observaciones?: string;

  @ApiProperty({ description: 'Fecha de aprobación', type: String, format: 'date', required: false })
  @Column({ type: 'date', nullable: true })
  fecha_aprobacion?: Date;

  @ApiProperty({ description: 'Jefe de academia asignado', required: false })
  @ManyToOne(() => Usuario, { nullable: true })
  jefe_academia?: Usuario | null;

  @ApiProperty({ description: 'Instructor asignado', required: false })
  @ManyToOne(() => Usuario, { nullable: true })
  instructor?: Usuario | null;

  @ApiProperty({ description: 'Periodo al que pertenece el curso' })
  @ManyToOne(() => Periodo, { nullable: false })
  periodo: Periodo;
}