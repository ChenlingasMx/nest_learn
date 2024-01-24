import { UserGuard } from './role.guard';

describe('UserGuard', () => {
  it('should be defined', () => {
    expect(new UserGuard()).toBeDefined();
  });
});
