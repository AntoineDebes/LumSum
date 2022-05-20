const { join } = require("path");
const DIR = process.env.NODE_ENV === "development" ? "src" : "dist";

module.exports = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  entities: [join(DIR, "**", "**", "entity", "*.{ts,js}")],
  migrations: [join(DIR, "migrations", "*.{ts,js}")],
  cli: {
    migrationsDir: join(DIR, "migrations"),
  },
  synchronize: true,
  logging: true,
  logger: "file",
  ssl: {
    rejectUnauthorized: false,
  },
};
