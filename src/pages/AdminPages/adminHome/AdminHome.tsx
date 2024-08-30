import useWarnIfBookingNotEmpty from "../../../custom Hooks/useWarnIfBookingNotEmpty";
import ProfileCard from "../../../components/ProfileCard";

const AdminHome = () => {
  useWarnIfBookingNotEmpty();
  return (
    <div>
      <ProfileCard />
    </div>
  );
};

export default AdminHome;
