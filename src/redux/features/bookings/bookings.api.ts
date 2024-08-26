import { TResponseRedux } from "../../../types/global";
import { baseApi } from "../../../redux/api/baseApi";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // getReviews: builder.query({
    //   query: () => ({
    //     url: "/reviews",
    //     method: "GET",
    //   }),
    //   transformResponse: (response: TResponseRedux<any>) => {
    //     // Assuming response.data is an array of reviews
    //     return {
    //       reviews: response.data,
    //       averageRating: response.averageRating,
    //     };
    //   },
    //   providesTags: ["reviews"],
    // }),
    addBookings: builder.mutation({
      query: (bookingInfo) => {
        console.log(bookingInfo);
        return {
          url: "/bookings",
          method: "POST",
          body: bookingInfo,
        };
      },
      invalidatesTags: ["bookings"],
    }),
  }),
});

export const { useAddBookingsMutation } = bookingApi;
