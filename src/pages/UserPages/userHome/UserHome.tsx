import useWarnIfBookingNotEmpty from "../../../custom Hooks/useWarnIfBookingNotEmpty";
import ProfileCard from "../../../components/ProfileCard";

const UserHome = () => {
  useWarnIfBookingNotEmpty();
  return (
    <div>
      <ProfileCard />
    </div>
  );
};

export default UserHome;
