import { useState } from "react";
import SectionTitle from "../../../components/SectionTitle";
import {
  useGetAllUsersQuery,
  useUpdateUserMutation,
} from "../../../redux/features/auth/authApi";
import { TLoadedUser } from "../../../types/loadedUser.type";
import toast from "react-hot-toast";
import Loading from "../../../components/Loading";

const AllUsersManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 5;

  const { data, isLoading } = useGetAllUsersQuery({
    page: currentPage,
    limit: dataPerPage,
  });

  const [updateUser] = useUpdateUserMutation();

  const totalPagesArray = [...Array(data?.meta.totalPage).keys()];

  const handleCurrentPage = async (page: number) => {
    setCurrentPage(page);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = async () => {
    if (currentPage < totalPagesArray.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleMakeUser = async (id: string) => {
    const options = {
      id,
      data: {
        role: "user",
      },
    };

    await toast.promise(updateUser(options).unwrap(), {
      loading: "Updating user role...",
      success: (res) => {
        if (res.success) {
          return "User status updated successfully";
        } else {
          throw new Error(res.message);
        }
      },
      error: "Failed to update status",
    });
  };

  const handleMakeAdmin = async (id: string) => {
    const options = {
      id,
      data: {
        role: "admin",
      },
    };

    await toast.promise(updateUser(options).unwrap(), {
      loading: "Updating user role...",
      success: (res) => {
        if (res.success) {
          return "User status updated successfully";
        } else {
          throw new Error(res.message);
        }
      },
      error: "Failed to update status",
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="mt-10">
      <SectionTitle
        sub="Quick Insights & Management Tools"
        heading="All Users Management"
      />

      <div className="flex items-center justify-between mb-12 mt-10">
        <h1 className="text-left font-bold text-2xl lg:text-3xl">All Users</h1>
      </div>

      <div
        style={{
          scrollbarWidth: "none" /* Firefox */,
          msOverflowStyle: "none" /* IE and Edge */,
          overflowY: "auto" /* Enable scrolling */,
        }}
        className="overflow-x-auto m-5"
      >
        <table className="table">
          {/* head */}
          <thead className="text-lg">
            <tr>
              <th>No.</th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Change Status</th>
            </tr>
          </thead>
          <tbody>
            {data?.usersData?.length > 0 &&
              data?.usersData?.map((singleUser: TLoadedUser, index: number) => (
                <tr key={index} className="rounded-lg">
                  <th className="text-lg">
                    {index + 1 + (currentPage - 1) * dataPerPage}
                  </th>
                  <td>
                    <img
                      src={singleUser?.image}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </td>
                  <td className="text-lg font-semibold">{singleUser?.name}</td>
                  <td className="text-lg font-semibold">{singleUser?.email}</td>
                  <td className="font-semibold text-lg">{singleUser?.phone}</td>
                  <td className="font-semibold text-lg flex justify-center items-center">
                    {singleUser?.role === "admin" ? (
                      <a
                        onClick={() => handleMakeUser(singleUser?._id)}
                        href="#"
                        className="bg-green-300 hover:bg-green-400 py-2 px-2 rounded-lg"
                      >
                        Admin
                      </a>
                    ) : (
                      <a
                        onClick={() => handleMakeAdmin(singleUser?._id)}
                        href="#"
                        className="bg-orange-300 hover:bg-orange-400 py-2 px-2 rounded-lg"
                      >
                        User
                      </a>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-center flex-wrap mt-8">
        {totalPagesArray?.length > 1 && (
          <div className="join pb-10">
            <button onClick={handlePrevPage} className="join-item btn">
              Previous
            </button>
            {totalPagesArray?.map((page) => (
              <button
                key={page}
                onClick={() => handleCurrentPage(page)}
                className={
                  currentPage === page + 1
                    ? "join-item btn selected bg-primary text-white"
                    : "join-item btn"
                }
              >
                {page + 1}
              </button>
            ))}
            <button onClick={handleNextPage} className="join-item btn">
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllUsersManagement;
