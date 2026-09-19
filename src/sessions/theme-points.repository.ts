import { Injectable } from '@nestjs/common';
import { CreateThemePointData } from './types/create-theme-point-data.type';
import { PoolClient } from 'pg';

@Injectable()
export class ThemePointsRepository {
  async create(data: CreateThemePointData, client: PoolClient) {
    const result = await client.query(
      `INSERT INTO theme_points(
        theme_id,
        point_order,
        point_text)
        VALUES($1, $2, $3)
        RETURNING
        id,
        theme_id AS "themeId",
        point_order AS "pointOrder",
        point_text AS "pointText",
        created_at AS "createdAt"
        `,
      [data.themeId, data.pointOrder, data.pointText],
    );

    return result.rows[0];
  }
}
