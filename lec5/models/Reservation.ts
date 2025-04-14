import { Schema, model } from "mongoose";

export interface IReservation {
  guestName: string;
  date: Date;
  roomNumber: number;
}

const reservationSchema = new Schema<IReservation>({
  guestName: { type: String, required: true },
  date: { type: Date, required: true },
  roomNumber: { type: Number, required: true },
});

export const Reservation = model<IReservation>("Reservation", reservationSchema);
