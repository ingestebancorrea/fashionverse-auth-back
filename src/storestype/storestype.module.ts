import { Module } from '@nestjs/common';
import { StorestypeService } from './storestype.service';
import { StorestypeController } from './storestype.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Storestype } from './entities/storestype.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Storestype])
  ],
  controllers: [StorestypeController],
  providers: [StorestypeService]
})
export class StorestypeModule {}
