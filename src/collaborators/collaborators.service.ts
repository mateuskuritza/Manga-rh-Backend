import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Collaborator } from './entities/collaborator.entity';
import { Knowledge } from './entities/knowledges.entity';

@Injectable()
export class CollaboratorsService {
  constructor(
    @InjectRepository(Collaborator)
    private readonly collaboratorRepository: Repository<Collaborator>,

    @InjectRepository(Knowledge)
    private readonly knowledgesRepository: Repository<Knowledge>,
  ) {}

  findAll() {
    return this.collaboratorRepository.find({
      select: ['id', 'name', 'created_at', 'valid'],
      order: { name: 'ASC' },
    });
  }

  findOne(name: string) {
    return this.collaboratorRepository.findOne(name, {
      relations: ['knowledges'],
    });
  }

  async findKnowledges() {
    try {
      const knowledges = await this.knowledgesRepository.find();
      return knowledges;
    } catch {
      throw new InternalServerErrorException();
    }
  }
}
