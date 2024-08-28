import { TResponseRedux } from "../../../types/global";
import { baseApi } from "../../../redux/api/baseApi";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBookings: builder.query({
      query: (queryData) => {
        const params = queryData ? { ...queryData } : {};

        return {
          url: "/bookings",
          method: "GET",
          params,
        };
      },
      transformResponse: (response: TResponseRedux<any>) => {
        return {
          bookingData: response.data.result,
          meta: response.data.meta,
        };
      },
      providesTags: ["bookings"],
    }),
    addBookings: builder.mutation({
      query: (bookingInfo) => {
        return {
          url: "/bookings",
          method: "POST",
          body: bookingInfo,
        };
      },
      transformResponse: (response: TResponseRedux<any>) => response.data,
      invalidatesTags: ["bookings"],
    }),
    getIndividualBooking: builder.query({
      query: () => {
        // const params = queryData ? { ...queryData } : {};

        return {
          url: "/my-bookings",
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<any>) => response.data,
      providesTags: ["bookings"],
    }),
  }),
});

export const {
  useAddBookingsMutation,
  useGetAllBookingsQuery,
  useGetIndividualBookingQuery,
} = bookingApi;
