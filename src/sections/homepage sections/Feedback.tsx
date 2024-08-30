import { ReactNode } from "react";
import SectionTitle from "../../components/SectionTitle";
import { useForm, Controller } from "react-hook-form";
import ReactStars from "react-stars";
import useUserDetails from "../../custom Hooks/useUserDetails";
import toast from "react-hot-toast";
import { useAddReviewsMutation } from "../../redux/features/reviews/reviews.api";
import { useNavigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface FeedbackFormValues {
  feedback: string;
  rating: number;
}

const Feedback = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FeedbackFormValues>({
    defaultValues: {
      feedback: "",
      rating: 0,
    },
  });

  const navigate = useNavigate();

  const { loadedUser } = useUserDetails();

  const [addReviews] = useAddReviewsMutation();

  const ref = useRef(null);

  // Use the useInView hook with the ref
  const isInView = useInView(ref);

  const onSubmit = async (data: FeedbackFormValues) => {
    if (!loadedUser || loadedUser.length === 0) {
      navigate("/login");
      toast.error("Please Login First");
      return;
    }

    const reviewData = {
      feedback: data.feedback,
      rating: data.rating,
      email: loadedUser[0].email,
      image: loadedUser[0].image,
      name: loadedUser[0].name,
    };

    await toast.promise(addReviews(reviewData).unwrap(), {
      loading: "Submitting review...",
      success: (res) => {
        if (res.success) {
          return res.message;
        } else {
          throw new Error(res.message);
        }
      },
      error: "Failed to submit review",
    });

    reset();
  };

  return (
    <div className="-mt-28 pt-8 mb-28">
      <SectionTitle
        sub="TELL US HOW WE’RE DOING!"
        heading="Customer Feedback"
      />

      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeInOut" }}
        className="flex flex-col lg:flex-row justify-center mt-12"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeInOut" }}
          className="flex-1"
        >
          <div className="mb-8 lg:mb-0 relative lg:w-full h-[450px] md:h-[300px] lg:h-[650px] xl:h-[470px] mx-5 md:mx-0">
            <img
              src="https://images.unsplash.com/photo-1610647752706-3bb12232b3ab?q=80&w=1450&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="absolute inset-0 object-cover w-full h-full"
            />
            <div className="relative bg-gray-900 bg-opacity-70 h-full">
              <h1 className="text-white py-28 md:px-20 md:py-28 lg:py-44 lg:px-7 xl:py-36 xl:px-20 px-6">
                <div className="flex flex-col gap-5">
                  <div className="flex gap-3">
                    <span className="flex flex-col gap-1 mt-[6px] items-end">
                      <span className="border-t-2 border-white w-9"></span>
                      <span className="border-t-2 border-white w-6"></span>
                    </span>
                    <p className="text-white xl:text-lg font-medium tracking-widest">
                      REVIEW
                    </p>
                  </div>
                  <h1 className="text-white text-2xl md:text-4xl xl:text-5xl font-bold">
                    Share Your Experience <br />
                  </h1>
                  <p className="text-xl">
                    Your feedback is crucial to our ongoing growth and
                    improvement. Thank you for taking the time to share your
                    valuable feedback.
                  </p>
                </div>
              </h1>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : -20 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeInOut" }}
          className="flex-1"
        >
          <div className="px-10 pt-5">
            <h1 className="text-3xl font-bold">Feedback</h1>
            <p className="mt-1 text-gray-500">
              Please provide your valuable feedback
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
              <div>
                <Controller
                  name="feedback"
                  control={control}
                  rules={{ required: "Feedback message is required" }}
                  render={({ field }) => (
                    <textarea
                      id="feedback"
                      {...field}
                      placeholder="Enter your feedback"
                      rows={4}
                      className="w-full box-border p-6 rounded-md border border-gray-300 outline-none invalid:border-primary transition placeholder-slate-400 focus:ring-1 focus:border-primary focus:ring-primary"
                    />
                  )}
                />
                <p className="text-red-600 font-medium mt-2">
                  {errors?.feedback?.message as ReactNode}
                </p>
              </div>

              <div style={{ marginTop: "16px" }}>
                <label htmlFor="rating" className="text-xl font-semibold">
                  Rating:
                </label>
                <Controller
                  name="rating"
                  control={control}
                  rules={{
                    validate: (value) => value > 0 || "Rating is required",
                  }}
                  render={({ field }) => (
                    <ReactStars
                      count={5}
                      value={field.value}
                      onChange={(newRating) => field.onChange(newRating)}
                      size={48}
                      color2={"#e08534"}
                    />
                  )}
                />
                <p className="text-red-600 font-medium">
                  {errors?.rating?.message as ReactNode}
                </p>
              </div>

              <button
                type="submit"
                className="px-4 py-3 text-white bg-primary rounded-lg btn-custom font-bold mt-3"
              >
                Submit Feedback
              </button>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Feedback;
