import { TCarService } from "./carService.type";

export type TSlotAppointment = {
  service: TCarService;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: "available" | "booked" | "canceled";
};
