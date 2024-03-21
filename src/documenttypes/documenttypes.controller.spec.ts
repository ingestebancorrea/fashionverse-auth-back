import { Test, TestingModule } from '@nestjs/testing';
import { DocumenttypesController } from './documenttypes.controller';
import { DocumenttypesService } from './documenttypes.service';

describe('DocumenttypesController', () => {
  let controller: DocumenttypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocumenttypesController],
      providers: [DocumenttypesService],
    }).compile();

    controller = module.get<DocumenttypesController>(DocumenttypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
