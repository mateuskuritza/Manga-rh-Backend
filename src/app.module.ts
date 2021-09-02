import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CollaboratorsModule } from './collaborators/collaborators.module';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: path.resolve(
        __dirname,
        '..',
        process.env.NODE_ENV === 'test' ? 'test.env' : '.env',
      ),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
    }),
    CollaboratorsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
