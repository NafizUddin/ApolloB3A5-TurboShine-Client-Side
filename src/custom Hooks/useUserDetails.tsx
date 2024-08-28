import { TLoadedUser } from "../types/loadedUser.type";
import { useGetAllUsersQuery } from "../redux/features/auth/authApi";
import { selectCurrentUser } from "../redux/features/auth/authSlice";
import { useAppSelector } from "../redux/hooks";

const useUserDetails = () => {
  const user = useAppSelector(selectCurrentUser);

  let loadedUser: TLoadedUser[];

  const { data, isLoading } = useGetAllUsersQuery({
    email: user?.email,
  });

  loadedUser = data?.usersData;

  if (!user) {
    loadedUser = [];
    return { loadedUser };
  }

  return { loadedUser, isLoading };
};

export default useUserDetails;
