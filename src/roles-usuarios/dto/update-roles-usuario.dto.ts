import { PartialType } from '@nestjs/swagger';
import { CreateRolesUsuarioDto } from './create-roles-usuario.dto';

export class UpdateRolesUsuarioDto extends PartialType(CreateRolesUsuarioDto) {}
