import { TResponseRedux } from "../../../types/global";
import { baseApi } from "../../../redux/api/baseApi";

const carServiceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getServices: builder.query({
      query: () => ({
        url: "/services",
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<any>) => response.data,
      providesTags: ["services"],
    }),
  }),
});

export const { useGetServicesQuery } = carServiceApi;
