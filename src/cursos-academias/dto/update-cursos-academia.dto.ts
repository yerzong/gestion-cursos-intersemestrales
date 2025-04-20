import { PartialType } from '@nestjs/swagger';
import { CreateCursosAcademiaDto } from './create-cursos-academia.dto';

export class UpdateCursosAcademiaDto extends PartialType(CreateCursosAcademiaDto) {}
