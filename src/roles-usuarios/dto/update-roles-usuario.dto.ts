import { PartialType } from '@nestjs/swagger';
import { CreateRolUsuarioDto } from './create-roles-usuario.dto';

export class UpdateRolUsuarioDto extends PartialType(CreateRolUsuarioDto) {}