import { Test, TestingModule } from '@nestjs/testing';
import { ClientpreferencesController } from './clientpreferences.controller';
import { ClientpreferencesService } from './clientpreferences.service';

describe('ClientpreferencesController', () => {
  let controller: ClientpreferencesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientpreferencesController],
      providers: [ClientpreferencesService],
    }).compile();

    controller = module.get<ClientpreferencesController>(ClientpreferencesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
