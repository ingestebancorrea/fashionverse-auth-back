import { Test, TestingModule } from '@nestjs/testing';
import { StorestypeController } from './storestype.controller';
import { StorestypeService } from './storestype.service';

describe('StorestypeController', () => {
  let controller: StorestypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StorestypeController],
      providers: [StorestypeService],
    }).compile();

    controller = module.get<StorestypeController>(StorestypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
