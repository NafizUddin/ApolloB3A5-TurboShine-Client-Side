import { TResponseRedux } from "../../../types/global";
import { baseApi } from "../../../redux/api/baseApi";

const slotApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSlots: builder.query({
      query: ({ dateRange, serviceId, page, limit }) => {
        console.log(page, limit);

        const params = new URLSearchParams();

        if (dateRange && dateRange.length > 0) {
          const date = dateRange.join(",");
          params.append("date", date);
        }

        if (serviceId) params.append("serviceId", serviceId);

        if (page && limit) {
          params.append("page", page);
          params.append("limit", limit);
        }

        return {
          url: `/slots/availability?${params.toString()}`,
          method: "GET",
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
    updateSlotStatus: builder.mutation({
      query: (options) => {
        return {
          url: `/slots/${options.id}`,
          method: "PATCH",
          body: options.data,
        };
      },
      invalidatesTags: ["slots"],
    }),
  }),
});

export const {
  useGetSlotsQuery,
  useAddNewSlotsMutation,
  useUpdateSlotStatusMutation,
} = slotApi;
