import { Test, TestingModule } from '@nestjs/testing';
import { DocumenttypesService } from './documenttypes.service';

describe('DocumenttypesService', () => {
  let service: DocumenttypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DocumenttypesService],
    }).compile();

    service = module.get<DocumenttypesService>(DocumenttypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
