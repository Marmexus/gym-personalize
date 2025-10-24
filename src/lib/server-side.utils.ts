import bcrypt from 'bcrypt';

export function hashing(password: string): Promise<string> {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}
