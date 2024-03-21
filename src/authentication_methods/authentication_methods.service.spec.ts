import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationMethodsService } from './authentication_methods.service';

describe('AuthenticationMethodsService', () => {
  let service: AuthenticationMethodsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthenticationMethodsService],
    }).compile();

    service = module.get<AuthenticationMethodsService>(AuthenticationMethodsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
