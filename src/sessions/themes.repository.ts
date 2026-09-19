import { Injectable } from '@nestjs/common';
import { CreateThemeData } from './types/create-theme-data.type';
import { PoolClient } from 'pg';

@Injectable()
export class ThemesRepository {
  async create(data: CreateThemeData, client: PoolClient) {
    const result = await client.query(
      `INSERT INTO session_themes (
            session_id,
            theme_order,
            theme_title
            )
            VALUES ($1, $2, $3)
            RETURNING
            id,
            session_id AS "sessionId",
            theme_order AS "themeOrder",
            theme_title AS "themeTitle",
            created_at AS "createdAt"
            `,
      [data.sessionId, data.themeOrder, data.themeTitle],
    );
    return result.rows[0];
  }

  async deleteBySessionId(sessionId: string, client: PoolClient) {
    await client.query(`DELETE FROM session_themes Where session_id = $1`, [
      sessionId,
    ]);
  }
}
