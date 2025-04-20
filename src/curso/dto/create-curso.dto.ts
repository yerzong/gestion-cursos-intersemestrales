import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsDateString, IsEnum, IsInt } from 'class-validator';
import { EstadoCurso } from '../entities/curso.entity';

export class CreateCursoDto {
  @ApiProperty({ description: 'Nombre del curso', maxLength: 100 })
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @ApiProperty({ description: 'Aula del curso', maxLength: 50, required: false })
  @IsOptional()
  @IsString()
  aula?: string;

  @ApiProperty({ description: 'Horario del curso', maxLength: 50, required: false })
  @IsOptional()
  @IsString()
  horario?: string;

  @ApiProperty({ description: 'Fecha de inicio (YYYY-MM-DD)', type: String, format: 'date' })
  @IsNotEmpty()
  @IsDateString()
  fecha_inicio: Date;

  @ApiProperty({ description: 'Fecha de fin (YYYY-MM-DD)', type: String, format: 'date' })
  @IsNotEmpty()
  @IsDateString()
  fecha_fin: Date;

  @ApiProperty({ description: 'Estado del curso', enum: EstadoCurso })
  @IsNotEmpty()
  @IsEnum(EstadoCurso)
  estado: EstadoCurso;

  @ApiProperty({ description: 'Observaciones', required: false })
  @IsOptional()
  @IsString()
  observaciones?: string;

  @ApiProperty({ description: 'Fecha de aprobación (YYYY-MM-DD)', type: String, format: 'date', required: false })
  @IsOptional()
  @IsDateString()
  fecha_aprobacion?: Date;

  @ApiProperty({ description: 'ID del jefe de academia (opcional)' })
  @IsOptional()
  @IsInt()
  jefeAcademiaId?: number;

  @ApiProperty({ description: 'ID del instructor (opcional)' })
  @IsOptional()
  @IsInt()
  instructorId?: number;

  @ApiProperty({ description: 'ID del periodo', required: true })
  @IsNotEmpty()
  @IsInt()
  periodoId: number;
}