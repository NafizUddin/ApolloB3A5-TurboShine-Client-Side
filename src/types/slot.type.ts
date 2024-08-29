import { TCarService } from "./carService.type";

export type TSlotAppointment = {
  _id: string;
  service: TCarService;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: "available" | "booked" | "cancelled" | "expired";
};
