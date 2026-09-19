import { QueryArrayResult, QueryResultRow } from 'pg';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar_url: string | null;
  created_at: Date;
  updated_at: Date;
}
