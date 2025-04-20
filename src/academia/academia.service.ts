import { Injectable } from '@nestjs/common';
import { CreateAcademiaDto } from './dto/create-academia.dto';
import { UpdateAcademiaDto } from './dto/update-academia.dto';

@Injectable()
export class AcademiaService {
  create(createAcademiaDto: CreateAcademiaDto) {
    return 'This action adds a new academia';
  }

  findAll() {
    return `This action returns all academia`;
  }

  findOne(id: number) {
    return `This action returns a #${id} academia`;
  }

  update(id: number, updateAcademiaDto: UpdateAcademiaDto) {
    return `This action updates a #${id} academia`;
  }

  remove(id: number) {
    return `This action removes a #${id} academia`;
  }
}
