import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { User } from './types/user.type';
import { UserCredentials } from './types/userCredentials.type';

@Injectable()
export class UsersRepository {
  constructor(private readonly database: DatabaseService) {}

  async findAll({ limit, offset }: { limit: number; offset: number }) {
    const result = await this.database.query<User>(
      `SELECT 
      id, 
      name,
      email, 
      avatar_url, created_at, 
      updated_at 
      FROM 
      users 
      ORDER BY created_at DESC
      LIMIT $1
      OFFSET $2`,
      [limit, offset],
    );
    return result.rows;
  }

  async count() {
    const result = await this.database.query<{ count: string }>(
      `SELECT COUNT(*) AS count FROM users`,
    );
    return Number(result.rows[0].count);
  }

  async findById(id: string) {
    const result = await this.database.query<User>(
      `SELECT id, name, email, avatar_url, created_at, updated_at FROM users WHERE id = $1`,
      [id],
    );
    return result.rows[0];
  }

  async create(data: { name: string; email: string; passwordHash: string }) {
    const result = await this.database.query<User>(
      `INSERT INTO users (
            name, email, password_hash)
            VALUES ($1, $2, $3)
            RETURNING
            id, name, email, avatar_url, created_at, updated_at`,
      [data.name, data.email, data.passwordHash],
    );
    return result.rows[0];
  }

  async findByEmail(email: string) {
    const result = await this.database.query<User>(
      `SELECT 
      id,
      name, 
      email, 
      avatar_url, created_at, 
      updated_at 
      FROM users 
      WHERE email = $1`,
      [email],
    );
    return result.rows[0];
  }
  async findCredentialsByEmail(email: string) {
    const result = await this.database.query<UserCredentials>(
      `SELECT
      id,
      email,
      password_hash as "passwordHash"
      FROM users
      WHERE email = $1`,
      [email],
    );
    return result.rows[0];
  }
}
