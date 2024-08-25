import { TResponseRedux } from "../../../types/global";
import { baseApi } from "../../../redux/api/baseApi";

type PriceRange = {
  start: number;
  end: number;
};

const carServiceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getServices: builder.query({
      query: ({ searchTerm, minTime, maxTime, priceRanges, selectedSort }) => {
        console.log("searchTerm:", searchTerm);
        console.log("minTime:", minTime);
        console.log("maxTime:", maxTime);
        console.log("priceRanges", priceRanges);
        console.log("selectedSort:", selectedSort);

        const params = new URLSearchParams();

        if (searchTerm) params.append("search", searchTerm);
        if (minTime) params.append("minTime", minTime.toString());
        if (maxTime) params.append("maxTime", maxTime.toString());

        priceRanges?.forEach((range: PriceRange) => {
          params.append("minPrice", range.start.toString());
          params.append("maxPrice", range.end.toString());
        });

        if (selectedSort) {
          // Determine the sort order
          const sortField = selectedSort.includes("descending")
            ? `-${selectedSort.split("-")[0]}`
            : selectedSort.split("-")[0];

          params.append("sort", sortField);
        }

        return {
          url: `/services?${params.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<any>) => response.data,
      providesTags: ["services"],
    }),
  }),
});

export const { useGetServicesQuery } = carServiceApi;
