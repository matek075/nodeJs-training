import { Reservation, IReservation } from "../models/Reservation";

export const createReservation = async (data: IReservation) => {
  const reservation = new Reservation(data);
  return await reservation.save();
};

export const getAllReservations = async () => {
  return await Reservation.find();
};
