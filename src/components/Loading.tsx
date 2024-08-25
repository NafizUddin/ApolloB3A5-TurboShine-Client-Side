import Lottie from "lottie-react";
import loading from "../assets/car.json";

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-[350px] -mt-10">
        <Lottie animationData={loading} loop={true} />
        <p className="text-4xl font-semibold text-center -mt-24">
          Loading.....
        </p>
      </div>
    </div>
  );
};

export default Loading;
