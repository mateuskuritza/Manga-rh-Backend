import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CollaboratorsService } from './collaborators.service';
import { CreateCollaboratorDto } from './dto/create-collaborator.dto';

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

  @Post('collaborator')
  create(@Body() newCollaborator: CreateCollaboratorDto) {
    return this.collaboratorService.create(newCollaborator);
  }

  @Post('collaborator/:id/validate')
  validate(@Param() id: string) {
    return this.collaboratorService.validate(id);
  }

  @Post('collaborator/:id/unvalidate')
  unvalidate(@Param() id: string) {
    return this.collaboratorService.unvalidate(id);
  }
}
