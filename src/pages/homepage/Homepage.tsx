import HomeServices from "../../sections/homepage sections/HomeServices";
import Banner from "../../sections/homepage sections/Banner";
import CallToAction from "../../sections/homepage sections/CallToAction";
import Feedback from "../../sections/homepage sections/Feedback";

const Homepage = () => {
  return (
    <div>
      <Banner />
      <HomeServices />
      <Feedback />
      <CallToAction />
    </div>
  );
};

export default Homepage;
