import { ValidationError } from 'errors';
import User from 'models/user';

describe('User password validation', () => {
  test('Password with 8 characters without a number', async () => {
    const invalidPassword = 'abcdefgh';
    await expect(User.validatePassword(invalidPassword)).rejects.toThrow(ValidationError);
  });

  test('Password with 8 characters without a lowercase letter', async () => {
    const invalidPassword = 'ABC12345';
    await expect(User.validatePassword(invalidPassword)).rejects.toThrow(ValidationError);
  });

  test('Password with 8 characters including a number and a lowercase letter', async () => {
    const validPassword = 'aBC12345';
    await expect(User.validatePassword(validPassword)).resolves.toBe(true);
  });

  test('Password with 14 characters including a number and a lowercase letter', async () => {
    const validPassword = 'aBCDefghijklmn1';
    await expect(User.validatePassword(validPassword)).resolves.toBe(true);
  });

  test('Password with 15 characters in any combination', async () => {
    const validPassword = 'abcdefghijklmno';
    await expect(User.validatePassword(validPassword)).resolves.toBe(true);
  });
});

describe('Rejects user creation with invalid password', () => {
  test('Password with 8 characters without a number', async () => {
    const invalidPassword = 'abcdefgh';

    const testUser = {
      username: 'test',
      email: 'testing@email.com',
      password: invalidPassword,
    };

    const promise = User.create(testUser);
    await expect(promise).rejects.toThrow(ValidationError);
    await expect(promise).rejects.toThrow(
      'A senha deve ter pelo menos 8 caracteres, incluindo um número e uma letra minúscula, ou 15 caracteres em qualquer combinação.',
    );
  });

  test('Password with 8 characters without a lowercase letter', async () => {
    const invalidPassword = 'ABC12345';
    const testUser = {
      username: 'test',
      email: 'testing@email.com',
      password: invalidPassword,
    };

    const promise = User.create(testUser);
    await expect(promise).rejects.toThrow(ValidationError);
    await expect(promise).rejects.toThrow(
      'A senha deve ter pelo menos 8 caracteres, incluindo um número e uma letra minúscula, ou 15 caracteres em qualquer combinação.',
    );
  });
});
