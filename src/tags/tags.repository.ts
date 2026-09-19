import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { TagType } from './dto/create-tag.dto';
import { Tag } from './types/tag.type';

@Injectable()
export class TagsRepository {
  constructor(private readonly db: DatabaseService) {}

  async create({
    userId,
    title,
    type,
  }: {
    userId: string;
    title: string;
    type: TagType;
  }) {
    const result = await this.db.query<Tag>(
      `INSERT INTO tags(
        user_id,
        title,
        type)
    VALUES
        ($1, $2, $3)
    RETURNING
        id,
        user_id as "userId",
        title,
        type,
        created_at as "createdAt",
        updated_at as "updatedAt"`,
      [userId, title, type],
    );
    return result.rows[0];
  }
  async findAllByUserId(userId: string) {
    const result = await this.db.query<Tag>(
      `SELECT
      id,
      user_id AS "userId",
      title,
      type,
      created_at AS "createdAt",
      updated_at AS "updatedAt"
      FROM tags
      WHERE user_id = $1
      ORDER BY created_at DESC`,
      [userId],
    );
    return result.rows;
  }

  async findById(id: string, userId: string) {
    const result = await this.db.query<Tag>(
      `SELECT
      id,
      user_id AS "userId",
      title,
      type,
      created_at AS "createdAt",
      updated_at AS "updatedAt"
      FROM tags
      WHERE id = $1
      AND user_id = $2`,
      [id, userId],
    );

    return result.rows[0];
  }

  async update(
    id: string,
    userId: string,
    data: {
      title?: string;
      type?: TagType;
    },
  ) {
    const result = await this.db.query<Tag>(
      `UPDATE tags
      SET
      title = COALESCE($1, title),
      type = COALESCE($2, type),updated_at = CURRENT_TIMESTAMP
      WHERE id = $3
      AND user_id = $4
      RETURNING
      id,
      user_id AS "userId",
      title,
      type,
      created_at AS "createdAt",
      updated_at AS "updatedAt"`,
      [data.title ?? null, data.type ?? null, id, userId],
    );
    return result.rows[0];
  }

  async delete(id: string, userId: string) {
    const result = await this.db.query(
      `DELETE FROM tags
      WHERE id = $1
      AND user_id = $2
      RETURNING
      id,
      user_id AS "userId",
      title,
      type`,
      [id, userId],
    );
    return result.rows[0];
  }
}
