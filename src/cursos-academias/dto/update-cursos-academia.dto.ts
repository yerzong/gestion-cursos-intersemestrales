import { PartialType } from '@nestjs/swagger';
import { CreateCursoAcademiaDto } from './create-cursos-academia.dto';

export class UpdateCursoAcademiaDto extends PartialType(CreateCursoAcademiaDto) {}