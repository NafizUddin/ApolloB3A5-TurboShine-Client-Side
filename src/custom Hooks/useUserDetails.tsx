import { selectCurrentUser } from "../redux/features/auth/authSlice";
import { useAppSelector } from "../redux/hooks";

const useUserDetails = () => {
  const user = useAppSelector(selectCurrentUser);

  return (
    <div>
      <h1>Hello, useUserDetails </h1>
    </div>
  );
};

export default useUserDetails;
