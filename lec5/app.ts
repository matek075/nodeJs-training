import "reflect-metadata";
import express from "express";
import { connectMongo, connectPostgresql } from "./data-sources";
import userRoutes from "./routes/user.routes";
import reservationRoutes from "./routes/reservation.routes";

const app = express();
app.use(express.json());

const start = async () => {
  await connectPostgresql();
  await connectMongo();

  app.use("/users", userRoutes);
  app.use("/reservations", reservationRoutes);

  app.listen(3000, () => {
    console.log("🚀 Server running on http://localhost:3000");
  });
};

start();
