import { Controller, Get, Param } from '@nestjs/common';
import { CollaboratorsService } from './collaborators.service';

@Controller()
export class CollaboratorsController {
  constructor(private readonly collaboratorService: CollaboratorsService) {}

  @Get('collaborator')
  findAll() {
    return this.collaboratorService.findAll();
  }

  @Get('collaborator/:name')
  findOne(@Param() name: string) {
    return this.collaboratorService.findOne(name);
  }

  @Get('knowledges')
  findKnowledges() {
    return this.collaboratorService.findKnowledges();
  }
}
