import { TResponseRedux } from "../../../types/global";
import { baseApi } from "../../../redux/api/baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getReviews: builder.query({
      query: () => ({
        url: "/reviews",
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<any>) => response.data,
      providesTags: ["reviews"],
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

export const { useGetReviewsQuery, useAddReviewsMutation } = reviewApi;
