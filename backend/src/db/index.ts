import type DatabaseType from 'better-sqlite3';

/**
 * SQLite bootstrap (better-sqlite3). Scaffold only: this wires the connection
 * entry point and reserves a place for migrations, but defines no schema yet —
 * the real tables are deferred to implementation.
 *
 * `better-sqlite3` is imported lazily inside {@link connect} (and only as a
 * type at module scope) so that simply loading the backend — e.g. the no-op
 * entrypoint, typecheck, or tests — never touches the native binding.
 */

export type Database = DatabaseType.Database;

export interface DbConfig {
  /** Path to the SQLite file. `:memory:` for an ephemeral store. */
  filename: string;
}

export const DEFAULT_DB_CONFIG: DbConfig = {
  filename: 'lens.sqlite',
};

/**
 * Open (and, in a future revision, migrate) the SQLite database.
 *
 * TODO(impl): run migrations from {@link ./migrations} and define the schema.
 */
export async function connect(config: DbConfig = DEFAULT_DB_CONFIG): Promise<Database> {
  const { default: Database } = await import('better-sqlite3');
  const db = new Database(config.filename);
  // TODO(impl): apply pending migrations here before returning.
  return db;
}
