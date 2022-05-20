import { ConnectionOptions } from "typeorm";
import { resolve } from "path";
console.log(__dirname);

const fileExt: string = process.env.NODE_ENV === "production" ? "*.js" : "*.ts";
console.log(fileExt);

const ORMConfig: ConnectionOptions = {
  name: "default",
  type: "mysql",
  host: process.env.DB_HOST!,
  port: +process.env.DB_PORT!,
  username: process.env.DB_USERNAME!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_DATABASE_NAME!,
  entities: [resolve(__dirname, "..", "services", "**", "entity", fileExt)],
  migrations: [`src/migration/*.${fileExt}`],
  cli: {
    migrationsDir: "src/migration",
  },
  synchronize: true,
  // We are using migrations, synchronize should be set to false.
  dropSchema: false,
  // Run migrations automatically,
  // you can disable this if you prefer running migration manually.
  migrationsRun: false,
  logging: false,
};

module.exports = ORMConfig;
export default ORMConfig;
