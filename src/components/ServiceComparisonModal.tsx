import { TCarService } from "../types/carService.type";

const ServiceComparisonModal = ({ service, setService, setModalType }: any) => {
  return (
    <div>
      <input type="checkbox" id="comparison-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box max-w-4xl !important space-y-4">
          {/* if there is a button in form, it will close the modal */}
          <label htmlFor="comparison-modal">
            <button
              onClick={() => {
                setModalType("");
                setService([]);
              }}
              className="bg-primary btn-circle absolute right-10 top-7 text-white hover:bg-white hover:outline hover:text-primary"
            >
              ✕
            </button>
          </label>

          <h3 className="font-bold text-3xl text-center">Compare Services</h3>

          <div className="grid grid-col-1 lg:grid-cols-2 gap-8">
            {service?.map((singleService: TCarService) => (
              <div
                key={singleService?._id}
                className="max-w-sm rounded overflow-hidden shadow-lg bg-white hover:shadow-xl flex flex-col h-full transition-shadow duration-300"
              >
                <img
                  className="w-full h-48 object-cover"
                  src={singleService?.image}
                  alt={singleService?.name}
                />
                <div className="flex flex-col flex-grow">
                  <div className="px-6 py-4 flex-grow">
                    <div className="font-bold text-xl mb-2 text-gray-800">
                      {singleService?.name}
                    </div>
                    <p className="text-gray-700 text-base flex-grow">
                      {singleService?.description}
                    </p>
                  </div>
                  <div className="px-6 pt-4 pb-2 flex justify-between items-center">
                    <span className="text-gray-900 font-bold text-lg">
                      ${singleService?.price.toFixed(2)}
                    </span>
                    <span className="text-gray-900 font-bold text-lg">
                      {singleService?.duration} minutes
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceComparisonModal;
