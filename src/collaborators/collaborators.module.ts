import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollaboratorsService } from './collaborators.service';
import { CollaboratorsController } from './collaborators.controller';
import { Collaborator } from './entities/collaborator.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Collaborator])],
  providers: [CollaboratorsService],
  controllers: [CollaboratorsController],
})
export class CollaboratorsModule {}
