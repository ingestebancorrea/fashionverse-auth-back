import { Module } from '@nestjs/common';
import { DocumenttypesService } from './documenttypes.service';
import { DocumenttypesController } from './documenttypes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Documenttype } from './entities/documenttype.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Documenttype])
  ],
  controllers: [DocumenttypesController],
  providers: [DocumenttypesService]
})
export class DocumenttypesModule {}
