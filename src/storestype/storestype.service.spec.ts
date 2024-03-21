import { Test, TestingModule } from '@nestjs/testing';
import { StorestypeService } from './storestype.service';

describe('StorestypeService', () => {
  let service: StorestypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StorestypeService],
    }).compile();

    service = module.get<StorestypeService>(StorestypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
