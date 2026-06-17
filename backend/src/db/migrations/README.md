# Migrations (placeholder)

SQLite migrations live here. The bootstrap (`../index.ts`) reserves the call
site that will apply them; the actual schema is deferred to the implementation
phase.

When the first vertical slice lands, add ordered migration files here (e.g.
`0001_init.sql` or `.ts`) and have `connect()` apply any not-yet-applied
migrations before returning the connection.
