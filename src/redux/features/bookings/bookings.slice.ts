import { TSlotAppointment } from "@/types/slot.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
    clearBooking: (state) => {
      state.slotInfo = [];
      state.totalCost = 0;
    },
  },
});

export const { addBooking, clearBooking } = bookingSlice.actions;

export default bookingSlice.reducer;
