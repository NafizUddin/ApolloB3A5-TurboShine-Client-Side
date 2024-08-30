import { Link } from "react-router-dom";
import banner from "../../assets/banner.mp4";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import useImmediateBooking from "../../custom Hooks/useImmediateBooking";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
};

const Banner = () => {
  const user = useAppSelector(selectCurrentUser);
  const { immediateBooking } = useImmediateBooking();

  return (
    <div className="mb-28">
      <div
        className={`relative ${
          user && immediateBooking
            ? "h-[630px] md:h-[560px] lg:h-[500px]"
            : "h-[630px] md:h-[560px] lg:h-[540px]"
        } `}
      >
        <video
          src={banner}
          className="absolute inset-0 object-cover w-full h-full"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="relative bg-gray-900 bg-opacity-70 h-full">
          <motion.div
            className={`flex flex-col justify-center items-center ${
              user && immediateBooking ? " lg:pt-24" : "lg:pt-28"
            } pt-28 pb-16 lg:pb-10 md:pt-28 md:pb-0`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              className="text-center text-white text-xl font-bold mx-4 md:text-3xl mb-6"
              variants={childVariants}
            >
              Revitalize Your Ride
            </motion.h1>
            <motion.div
              variants={childVariants}
              className="text-center text-3xl font-bold mx-4 md:text-5xl text-white max-w-xl mb-6 h-24"
            >
              <TypeAnimation
                sequence={[
                  "Top-Tier Car Wash & Detailing Services",
                  1000,
                  "Expert Car Detailing and Maintenance",
                  1000,
                  "Comprehensive Car Care at Your Convenience",
                  1000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                cursor={false}
              />
            </motion.div>
            <motion.p
              className="text-white text-center lg:max-w-3xl lg:mx-auto text-lg mx-14 md:mx-20"
              variants={childVariants}
            >
              At TurboShine, we go beyond the basics to provide exceptional car
              care. Our professional team uses state-of-the-art techniques to
              ensure every inch of your vehicle sparkles. Book now and drive
              with confidence.
            </motion.p>
            <motion.div className="mt-6" variants={childVariants}>
              <Link to="/services">
                <button className="px-4 py-3 text-white bg-primary rounded-lg font-semibold btn-custom text-lg">
                  Book Now
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
