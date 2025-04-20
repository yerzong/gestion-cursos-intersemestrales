import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Curso } from 'src/curso/entities/curso.entity';

export enum Calificacion {
  Aprobado = 'Aprobado',
  NoAprobado = 'No aprobado',
}

@Entity({ name: 'evaluaciones' })
export class Evaluacion {
  @ApiProperty({ description: 'Identificador de la evaluación' })
  @PrimaryGeneratedColumn({ name: 'id_evaluacion' })
  id: number;

  @ApiProperty({ description: 'Usuario evaluado' })
  @ManyToOne(() => Usuario, { nullable: false })
  usuario: Usuario;

  @ApiProperty({ description: 'Curso evaluado' })
  @ManyToOne(() => Curso, { nullable: false })
  curso: Curso;

  @ApiProperty({ description: 'Calificación', enum: Calificacion })
  @Column({ type: 'enum', enum: Calificacion })
  calificacion: Calificacion;

  @ApiProperty({ description: 'Fecha de evaluación', type: String, format: 'date' })
  @Column({ type: 'date' })
  fecha_evaluacion: Date;

  @ApiProperty({ description: 'Observaciones', required: false })
  @Column({ type: 'text', nullable: true })
  observaciones?: string;

  @ApiProperty({ description: 'Evaluador', required: false })
  @ManyToOne(() => Usuario, { nullable: true })
  evaluador?: Usuario | null;
}