// import '@/lib/config';
import { drizzle } from 'drizzle-orm/node-postgres';

import { Pool } from 'pg';
import { DefaultLogger, LogWriter, Logger } from 'drizzle-orm/logger';
import { logger } from '@/logger';

class MyLogWriter implements LogWriter {
  write(message: string) {
    logger.info(message);
  }
}

class MyLogger implements Logger {
  logQuery(query: string, params: unknown[]): void {
    logger.info({ query, params });
  }
}

const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

const dbLogger = new DefaultLogger({ writer: new MyLogWriter() });

export const db = drizzle(pool, { logger: new MyLogger() });
