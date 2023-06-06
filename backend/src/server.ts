import cors from "cors";
import express from "express";
import http from "http";
import mongoose from "mongoose";
import { config } from "./config/config";
import Logger from "./library/Logger";
import todoRoutes from "./routes/Todo";

const router = express();

// Connect to DB
mongoose
  .connect(config.mongo.url, { retryWrites: true, w: "majority" })
  .then(() => {
    Logger.info("connected to mongoDB");
    StartServer();
  })
  .catch((err) => {
    Logger.error(err);
  });

const StartServer = () => {
  router.use((req, res, next) => {
    Logger.info(
      `Incoming -> method: [${req.method}], url: [${req.url}], IP: [${req.socket.remoteAddress}]`
    );

    res.on("finish", () => {
      Logger.info(
        `Outgoing -> method: [${req.method}], url: [${req.url}], IP: [${req.socket.remoteAddress}], status: [${res.statusCode}]`
      );
    });

    next();
  });

  router.use(express.urlencoded({ extended: true }));
  router.use(express.json());

  router.use(cors());

  router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

    if (req.method === "OPTIONS") {
      res.header(
        "Access-Control-Allow-Methods",
        "PUT, POST, PATCH, DELETE, GET"
      );
      return res.status(200).json({});
    }

    next();
  });

  // Routes
  router.use("/todos", todoRoutes);

  // Healthcheck
  router.get("/ping", (req, res, next) =>
    res.status(200).json({ message: "pong" })
  );

  // Error handling
  router.use((req, res, next) => {
    const error = new Error("not found");
    Logger.error(error);

    return res.status(404).json({ message: error.message });
  });

  http
    .createServer(router)
    .listen(config.server.port, () =>
      Logger.info(`Server is running on port ${config.server.port}`)
    );
};
