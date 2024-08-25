import SectionTitle from "../../components/SectionTitle";
import Loading from "../../components/Loading";
import { useGetReviewsQuery } from "../../redux/features/reviews/reviews.api";
import { IFeedback } from "../../types/review.type";
import ReactStars from "react-stars";

const ReviewPage = () => {
  const { data, isLoading } = useGetReviewsQuery(undefined);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="my-10">
      <SectionTitle
        sub="VOICES OF OUR VALUED CLIENTS"
        heading="Customer Insights"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 my-20">
        {data?.reviews?.map((singleReview: IFeedback) => (
          <figure className="max-w-screen-md mx-auto text-center border border-gray-300 p-10">
            <svg
              className="w-10 h-10 mx-auto mb-3 text-primary"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 14"
            >
              <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
            </svg>
            <blockquote>
              <p className="text-2xl italic font-medium text-gray-900">
                "{singleReview.feedback}"
              </p>
            </blockquote>
            <figcaption className="flex items-center justify-center mt-6 space-x-3 rtl:space-x-reverse">
              <img
                className="w-6 h-6 rounded-full"
                src={singleReview.image}
                alt="profile picture"
              />
              <div className="flex items-center divide-x-2 rtl:divide-x-reverse divide-gray-500">
                <cite className="pe-3 font-semibold text-gray-900">
                  {singleReview.name}
                </cite>
                <ReactStars
                  count={5}
                  value={singleReview.rating}
                  size={24}
                  color2={"#e08534"}
                  edit={false}
                  className="pl-3"
                />
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
};

export default ReviewPage;
