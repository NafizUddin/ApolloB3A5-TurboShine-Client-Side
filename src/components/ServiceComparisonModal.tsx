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
              }}
              className="bg-primary btn-circle absolute right-10 top-7 text-white hover:bg-white hover:outline hover:text-primary"
            >
              ✕
            </button>
          </label>

          <h3 className="font-bold text-3xl text-center">Compare Services</h3>
        </div>
      </div>
    </div>
  );
};

export default ServiceComparisonModal;
