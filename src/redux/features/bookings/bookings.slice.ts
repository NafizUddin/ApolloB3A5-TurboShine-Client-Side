import { TSlotAppointment } from "@/types/slot.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";

type TInitialState = {
  slotInfo: TSlotAppointment[];
  totalCost: number;
};

const initialState: TInitialState = {
  slotInfo: [],
  totalCost: 0,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    addBooking: (state, action: PayloadAction<TInitialState>) => {
      const newSlots = action.payload.slotInfo.filter(
        (newSlot) =>
          !state.slotInfo.some(
            (existingSlot) => existingSlot._id === newSlot._id
          )
      );

      // Only add new slots that are not already in the slotInfo array
      state.slotInfo.push(...newSlots);

      // Calculate the total cost for the new slots only
      state.totalCost += action.payload.totalCost * newSlots.length;
    },
    removeBooking: (state, action: PayloadAction<string>) => {
      const slotIdToRemove = action.payload;

      const slotToRemove = state.slotInfo.find(
        (slot) => slot._id === slotIdToRemove
      );

      if (slotToRemove) {
        state.slotInfo = state.slotInfo.filter(
          (slot) => slot._id !== slotIdToRemove
        );

        state.totalCost -= slotToRemove.service.price;
      }
    },
    clearBooking: (state) => {
      state.slotInfo = [];
      state.totalCost = 0;
    },
  },
});

export const { addBooking, removeBooking, clearBooking } = bookingSlice.actions;

export default bookingSlice.reducer;

export const totalSlotsCount = (state: RootState) =>
  state.bookings.slotInfo.length;
