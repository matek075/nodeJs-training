import { Router, Request, Response } from "express";
import { createReservation, getAllReservations } from "../services/reservation.service";

const router = Router();

router.get("/", async (_req: Request, res: Response) => {
  try {
    const reservations = await getAllReservations();
    res.json(reservations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const newReservation = await createReservation(req.body);
    res.status(201).json(newReservation);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Invalid data" });
  }
});

export default router;
