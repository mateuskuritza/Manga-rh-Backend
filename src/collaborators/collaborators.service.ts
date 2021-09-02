import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCollaboratorDto } from './dto/create-collaborator.dto';
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

  async create(newCollaborator: CreateCollaboratorDto) {
    try {
      const knowledges = await Promise.all(
        newCollaborator.knowledges.map((id) => this.preloadKnowledgeById(id)),
      );
      const collaborator = await this.collaboratorRepository.save({
        ...newCollaborator,
        knowledges,
      });

      return collaborator;
    } catch {
      throw new ConflictException('Existing CPF or invalid knowledge ID');
    }
  }

  private async preloadKnowledgeById(id: number): Promise<Knowledge> {
    const knowledge = await this.knowledgesRepository.findOne({ id });
    return knowledge;
  }

  async validate(id: string) {
    const collaborator = await this.collaboratorRepository.findOne(id);
    if (!collaborator) throw new NotFoundException('Id not found');
    collaborator.valid = true;
    await this.collaboratorRepository.save(collaborator);
  }

  async unvalidate(id: string) {
    const collaborator = await this.collaboratorRepository.findOne(id);
    if (!collaborator) throw new NotFoundException('Id not found');
    collaborator.valid = false;
    await this.collaboratorRepository.save(collaborator);
  }
}
