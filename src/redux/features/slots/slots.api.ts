import { TResponseRedux } from "../../../types/global";
import { baseApi } from "../../../redux/api/baseApi";

const slotApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSlots: builder.query({
      query: ({
        dateRange,
        serviceId,
      }: {
        dateRange: string[];
        serviceId: string;
      }) => ({
        url: "/slots/availability",
        method: "GET",
        params: {
          date: dateRange.join(","), // Joining array to comma-separated string
          serviceId: serviceId,
        },
      }),
      transformResponse: (response: TResponseRedux<any>) => {
        return {
          slotData: response.data.result,
          meta: response.data.meta,
        };
      },
      providesTags: ["slots"],
    }),
    addNewSlots: builder.mutation({
      query: (slotInfo) => {
        return {
          url: "/services/slots",
          method: "POST",
          body: slotInfo,
        };
      },
      invalidatesTags: ["slots"],
    }),
  }),
});

export const { useGetSlotsQuery, useAddNewSlotsMutation } = slotApi;
