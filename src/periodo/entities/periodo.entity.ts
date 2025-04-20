import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export enum EstadoPeriodo {
  Abierto = 'Abierto',
  Cerrado = 'Cerrado',
}

@Entity({ name: 'periodos' })
export class Periodo {
  @ApiProperty({ description: 'Identificador del periodo' })
  @PrimaryGeneratedColumn({ name: 'id_periodo' })
  id: number;

  @ApiProperty({ description: 'Nombre del periodo', maxLength: 100 })
  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @ApiProperty({ description: 'Fecha de inicio del periodo', type: String, format: 'date' })
  @Column({ type: 'date' })
  fecha_inicio: Date;

  @ApiProperty({ description: 'Fecha de fin del periodo', type: String, format: 'date' })
  @Column({ type: 'date' })
  fecha_fin: Date;

  @ApiProperty({ description: 'Estado del periodo', enum: EstadoPeriodo })
  @Column({ type: 'enum', enum: EstadoPeriodo })
  estado: EstadoPeriodo;

  @ApiProperty({ description: 'Fecha límite de registro', type: String, format: 'date', required: false })
  @Column({ type: 'date', nullable: true })
  fecha_limite_registro: Date;

  @ApiProperty({ description: 'Fecha límite de validación', type: String, format: 'date', required: false })
  @Column({ type: 'date', nullable: true })
  fecha_limite_validacion: Date;
}