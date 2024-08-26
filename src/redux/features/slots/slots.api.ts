import { TResponseRedux } from "../../../types/global";
import { baseApi } from "../../../redux/api/baseApi";

const slotApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSlots: builder.query({
      query: ({
        currentDate,
        serviceId,
      }: {
        currentDate: string;
        serviceId: string;
      }) => ({
        url: "/slots/availability",
        method: "GET",
        params: {
          date: currentDate,
          serviceId: serviceId,
        },
      }),
      transformResponse: (response: TResponseRedux<any>) => response.data,
      providesTags: ["slots"],
    }),
    addReviews: builder.mutation({
      query: (reviewInfo) => {
        return {
          url: "/reviews",
          method: "POST",
          body: reviewInfo,
        };
      },
      invalidatesTags: ["reviews"],
    }),
  }),
});

export const { useGetSlotsQuery, useAddReviewsMutation } = slotApi;
