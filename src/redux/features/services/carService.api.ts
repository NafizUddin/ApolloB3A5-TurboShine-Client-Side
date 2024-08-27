import { TResponseRedux } from "../../../types/global";
import { baseApi } from "../../../redux/api/baseApi";

type PriceRange = {
  start: number;
  end: number;
};

const carServiceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getServices: builder.query({
      query: ({
        searchTerm,
        minTime,
        maxTime,
        priceRanges,
        selectedSort,
        page,
        limit,
      }) => {
        // console.log("searchTerm:", searchTerm);
        // console.log("minTime:", minTime);
        // console.log("maxTime:", maxTime);
        // console.log("priceRanges", priceRanges);
        // console.log("selectedSort:", selectedSort);

        const params = new URLSearchParams();

        if (searchTerm) params.append("searchTerm", searchTerm);
        if (minTime) params.append("minTime", minTime.toString());
        if (maxTime) params.append("maxTime", maxTime.toString());

        if (priceRanges?.length) {
          const priceRangesArray = priceRanges.map(
            (range: PriceRange) => `${range.start}-${range.end}`
          );
          params.append("priceRanges", priceRangesArray.join(","));
        }

        if (selectedSort) {
          // Determine the sort order
          const sortField = selectedSort.includes("descending")
            ? `-${selectedSort.split("-")[0]}`
            : selectedSort.split("-")[0];

          params.append("sort", sortField);
        }

        if (page && limit) {
          params.append("page", page);
          params.append("limit", limit);
        }

        return {
          url: `/services?${params.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<any>) => {
        // Assuming response.data is an array of reviews
        return {
          serviceData: response.data.result,
          meta: response.data.meta,
        };
      },
      providesTags: ["services"],
    }),
    getSingleService: builder.query({
      query: (id) => {
        let url = `/services/${id}`;

        return {
          url,
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<any>) => response.data,
      providesTags: ["services"],
    }),
    addService: builder.mutation({
      query: (serviceInfo) => {
        return {
          url: "/services",
          method: "POST",
          body: serviceInfo,
        };
      },
      invalidatesTags: ["services"],
    }),
    updateService: builder.mutation({
      query: (options) => {
        return {
          url: `/services/${options.id}`,
          method: "PUT",
          body: options.data,
        };
      },
      invalidatesTags: ["services"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/services/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["services"],
    }),
  }),
});

export const {
  useGetServicesQuery,
  useGetSingleServiceQuery,
  useAddServiceMutation,
  useUpdateServiceMutation,
  useDeleteProductMutation,
} = carServiceApi;
