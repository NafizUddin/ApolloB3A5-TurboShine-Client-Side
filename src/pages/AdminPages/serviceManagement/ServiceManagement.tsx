import { useState } from "react";
import SectionTitle from "../../../components/SectionTitle";
import {
  useDeleteServiceMutation,
  useGetServicesQuery,
} from "../../../redux/features/services/carService.api";
import { FaPlus } from "react-icons/fa";
import { TCarService } from "../../../types/carService.type";
import { CiCircleMore } from "react-icons/ci";
import Loading from "../../../components/Loading";
import Swal from "sweetalert2";
import ServiceModal from "../../../components/ServiceModal";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

type TServiceState = TCarService | object | null;

const ServiceManagement = () => {
  const [modalType, setModalType] = useState<string>("");
  const [service, setService] = useState<TServiceState>({});
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 5;
  const queryObj = {
    page: currentPage,
    limit: dataPerPage,
  };

  const [deleteService] = useDeleteServiceMutation();

  const { data: allServices, isLoading } = useGetServicesQuery(queryObj);

  const totalPagesArray = [...Array(allServices?.meta.totalPage).keys()];

  const handleDeleteService = async (id: string) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#2e8b57",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });
      if (result.isConfirmed) {
        const res = await deleteService(id).unwrap();
        if (res.success) {
          toast.success(res.message, {
            duration: 4000,
          });
        }
      }
    } catch (error) {
      // console.error("Error deleting the donation:", error);
      toast.error("There was an error deleting the file.");
    }
  };

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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="mt-10">
      <SectionTitle
        sub="Quick Insights & Management Tools"
        heading="Service Management"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
        className="flex items-center justify-between mb-12 mt-10"
      >
        <h1 className="text-left font-bold text-2xl lg:text-3xl">
          All Services
        </h1>
        <label
          htmlFor="product-modal"
          onClick={() => {
            setModalType("add");
            setService({});
          }}
          className="flex items-center gap-2 px-2 md:px-4 py-1 md:py-3 btn-custom rounded-full text-white bg-primary"
        >
          <FaPlus className="text-xl mr-1" />
          <span className="mt-1">Add New Service</span>
        </label>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.9 }}
        style={{
          scrollbarWidth: "none" /* Firefox */,
          msOverflowStyle: "none" /* IE and Edge */,
          overflowY: "auto" /* Enable scrolling */,
        }}
        className="overflow-x-auto m-5 "
      >
        <table className="table table-sm">
          {/* head */}
          <thead className="text-lg">
            <tr>
              <th>No.</th>
              <th>Image</th>
              <th>Name</th>
              <th>Cost</th>
              <th>Duration</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allServices?.serviceData?.length > 0 &&
              allServices?.serviceData?.map(
                (singleService: TCarService, index: number) => (
                  <tr key={index} className="rounded-lg">
                    <th>{index + 1 + (currentPage - 1) * dataPerPage}</th>
                    <td>
                      <img
                        src={singleService?.image}
                        className="w-20 h-20 object-contain"
                      />
                    </td>
                    <td className="font-semibold">{singleService?.name}</td>
                    <td className="font-semibold">
                      ${singleService?.price.toFixed(2)}
                    </td>
                    <td className="font-semibold">
                      {singleService?.duration} minutes
                    </td>
                    <td className="xl:text-lg font-semibold">
                      <div className="dropdown dropdown-left">
                        <label tabIndex={0} className="m-1 cursor-pointer">
                          <CiCircleMore className="text-3xl" />
                        </label>
                        <ul
                          tabIndex={0}
                          className="dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box w-32"
                        >
                          <Link to={`/serviceDetails/${singleService._id}`}>
                            <li>
                              <span>View</span>
                            </li>
                          </Link>
                          <li>
                            <label
                              onClick={() => {
                                setModalType("edit");
                                setService(singleService);
                              }}
                              htmlFor="product-modal"
                              className=""
                            >
                              Edit
                            </label>
                          </li>

                          <li>
                            <span
                              onClick={() =>
                                handleDeleteService(
                                  singleService?._id as string
                                )
                              }
                              className=""
                            >
                              Delete
                            </span>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                )
              )}
          </tbody>
        </table>
      </motion.div>

      <div className="flex justify-center items-center flex-wrap">
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

      {(modalType === "add" ||
        (modalType === "edit" &&
          service &&
          Object.keys(service)?.length > 0)) && (
        <ServiceModal
          service={service}
          setService={setService}
          setModalType={setModalType}
        />
      )}
    </div>
  );
};

export default ServiceManagement;
