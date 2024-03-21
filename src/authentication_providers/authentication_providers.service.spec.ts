import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationProvidersService } from './authentication_providers.service';

describe('AuthenticationProvidersService', () => {
  let service: AuthenticationProvidersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthenticationProvidersService],
    }).compile();

    service = module.get<AuthenticationProvidersService>(AuthenticationProvidersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
