import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Collaborator } from './entities/collaborator.entity';

@Injectable()
export class CollaboratorsService {
  constructor(
    @InjectRepository(Collaborator)
    private readonly collaboratorRepository: Repository<Collaborator>,
  ) {}

  findAll() {
    return this.collaboratorRepository.find({
      select: ['id', 'name', 'created_at', 'valid'],
      order: { name: 'ASC' },
    });
  }

  findOne(name: string) {
    return this.collaboratorRepository.findOne(name);
  }
}
