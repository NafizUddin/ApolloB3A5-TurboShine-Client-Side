import { useGetAllUsersQuery } from "../redux/features/auth/authApi";
import { selectCurrentUser } from "../redux/features/auth/authSlice";
import { useAppSelector } from "../redux/hooks";

const useUserDetails = () => {
  const user = useAppSelector(selectCurrentUser);

  const { data: loadedUser, isLoading } = useGetAllUsersQuery({
    email: user?.email,
  });

  return { loadedUser, isLoading };
};

export default useUserDetails;
