import "dotenv/config";
import "reflect-metadata";
import express, { Application } from "express";
import { ApolloServer } from "apollo-server-express";
// import { applyMiddleware } from 'graphql-middleware';
import { createServer } from "http";
import compression from "compression";
import cors from "cors";
import { addResolversToSchema } from "@graphql-tools/schema";
import { createConnection } from "typeorm";
import cookieParser from "cookie-parser";
import { schema, resolvers } from "./graphql";
import { IContext, IExpress } from "./@types/context";
import { getCurrentUser } from "./utils/auth.utils";

const shieldSchema = addResolversToSchema({
  schema,
  resolvers,
});

const app: Application = express();

app.use(
  cors({
    credentials: true,
    origin: [
      "https://www.lumsum.io",
      "https://lumsum.io",
      "https://www.staging.lumsum.io",
      "https://staging.lumsum.io",
      "https://admin.lumsum.io",
      "http://admin.lumsum.io",
      "https://stagingadmin.lumsum.io",
      "http://stagingadmin.lumsum.io",
      "http://localhost:3001",
      "http://localhost:3000",
    ],
  })
);

app.use(compression());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const apolloServer = new ApolloServer({
  schema: shieldSchema,
  context: ({ req, res }: IExpress): IContext => {
    return {
      req,
      currentUser: getCurrentUser(req),
      res,
    };
  },
  introspection: true,
  playground: true,
});

apolloServer.applyMiddleware({ app });

app.get("/", (_, res) => {
  res.json({ message: "it's working now" });
});

const httpServer = createServer(app);

createConnection()
  .then(() => {
    console.log("DB Connected!");
    return httpServer.listen(process.env.PORT!);
  })
  .then(() => {
    console.log(`Server running on ${process.env.PORT!}`);
  })
  .catch((err) => console.error(err));
