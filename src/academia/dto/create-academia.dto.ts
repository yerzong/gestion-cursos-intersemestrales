import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateAcademiaDto {
  @ApiProperty({ description: 'Código único de la academia', maxLength: 10 })
  @IsNotEmpty()
  @IsString()
  @MaxLength(10)
  codigo: string;

  @ApiProperty({ description: 'Nombre de la academia', maxLength: 100 })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  nombre: string;
}