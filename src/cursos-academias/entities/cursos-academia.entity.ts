import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Curso } from 'src/curso/entities/curso.entity';
import { Academia } from 'src/academia/entities/academia.entity';

@Entity({ name: 'cursos_academias' })
export class CursoAcademia {
  @ApiProperty({ description: 'Identificador de la relación' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Curso asociado' })
  @ManyToOne(() => Curso, { nullable: false })
  curso: Curso;

  @ApiProperty({ description: 'Academia asociada' })
  @ManyToOne(() => Academia, { nullable: false })
  academia: Academia;
}