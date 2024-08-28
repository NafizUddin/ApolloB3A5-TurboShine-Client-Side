import { TResponseRedux } from "../../../types/global";
import { baseApi } from "../../../redux/api/baseApi";

const slotApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSlots: builder.query({
      query: ({
        dateRange,
        serviceId,
        page,
        limit,
      }: {
        dateRange: string[];
        serviceId: string;
        page: number;
        limit: number;
      }) => {
        return {
          url: "/slots/availability",
          method: "GET",
          params: {
            date: dateRange.join(","), // Joining array to comma-separated string
            serviceId: serviceId,
            page,
            limit,
          },
        };
      },
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
