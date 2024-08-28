import { TCarService } from "./carService.type";
import { TLoadedUser } from "./loadedUser.type";
import { TSlotAppointment } from "./slot.type";

export type TBooking = {
  customer: TLoadedUser;
  service: TCarService;
  slot: TSlotAppointment;
  transactionId: string;
  paymentStatus: string;
  totalBookingCost: number;
};
