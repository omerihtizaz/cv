import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AuthService } from './users/auth.service';
import { User } from './users/user.entity';
import { UsersService } from './users/users.service';
describe('AuthService', () => {
  let authService: AuthService;
  let fakeService: Partial<UsersService>;
  beforeEach(async () => {
    const users: User[] = [];
    fakeService = {
      find: (email: string) => {
        return Promise.resolve(users.filter((user) => user.email === email));
      },
      create: (name: string, email: string, password: string) => {
        const user = {
          id: Math.floor(Math.random() * 9999),
          name,
          email,
          password,
        } as unknown as User;
        users.push(user);
        return Promise.resolve(user);
      },
    };
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeService,
        },
      ],
    }).compile();

    authService = module.get(AuthService);
  });
  it('can create an instance of auth service', async () => {
    expect(authService).toBeDefined();
  });

  //   it('can create a salt and a hash for a given user', async () => {
  //     const user = await authService.signup('name', 'tas@dajf.com', 'tassafdsa');
  //     expect(user.password).not.toEqual('tassafdsa');
  //     console.log(user);
  //     const [salt, hash] = user.password.split('.');
  //     expect(salt).toBeDefined();
  //     expect(hash).toBeDefined();
  //   });
  it('throws an error if the user tries to sign up with an exsistng email', async () => {
    await authService.signup('n', 'n@gmail.com', '123');
    await expect(authService.signup('n', 'n@gmail.com', '123')).rejects.toThrow(
      BadRequestException,
    );
  });
  it('throws if signin is called with an unused email', async () => {
    await expect(
      authService.signin('asdflkj@asdlfkj.com', 'passdflkj'),
    ).rejects.toThrow(NotFoundException);
  });
  it('throws if an invalid password is provided', async () => {
    await authService.signup(
      'testing_',
      'laskdj22f@alskdfj.com',
      'confizTesting2',
    );
    await expect(
      authService.signin('laskdj22f@alskdfj.com', 'passowrd'),
    ).rejects.toThrow(NotFoundException);
  });
  it('returns a user if correct password is provided', async () => {
    await authService.signup(
      'testing_',
      'laskdjf@alskdfj.com',
      'confizTesting2',
    );
    await expect(
      await authService.signin('laskdjf@alskdfj.com', 'confizTesting2'),
    ).toBeDefined();
  });
});
