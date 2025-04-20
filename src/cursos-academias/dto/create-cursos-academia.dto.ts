import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsInt } from 'class-validator';

export class CreateCursoAcademiaDto {
  @ApiProperty({ description: 'ID del curso', example: 1 })
  @IsNotEmpty()
  @IsInt()
  cursoId: number;

  @ApiProperty({ description: 'ID de la academia', example: 2 })
  @IsNotEmpty()
  @IsInt()
  academiaId: number;
}