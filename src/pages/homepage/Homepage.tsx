import HomeServices from "../../sections/homepage sections/HomeServices";
import Banner from "../../sections/homepage sections/Banner";
import CallToAction from "../../sections/homepage sections/CallToAction";
import Feedback from "../../sections/homepage sections/Feedback";
import Testimonial from "../../sections/homepage sections/Testimonial";
import { useEffect } from "react";

const Homepage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Banner />
      <HomeServices />
      <Feedback />
      <Testimonial />
      <CallToAction />
    </div>
  );
};

export default Homepage;
