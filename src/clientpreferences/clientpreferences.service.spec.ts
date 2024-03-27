import { Test, TestingModule } from '@nestjs/testing';
import { ClientpreferencesService } from './clientpreferences.service';

describe('ClientpreferencesService', () => {
  let service: ClientpreferencesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientpreferencesService],
    }).compile();

    service = module.get<ClientpreferencesService>(ClientpreferencesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
