import { FaPlus } from "react-icons/fa";
import SectionTitle from "../../../components/SectionTitle";
import { useState } from "react";
import CreateSlotModal from "../../../components/CreateSlotModal";

const SlotManagement = () => {
  const [modalType, setModalType] = useState<string>("");

  return (
    <div className="mt-10">
      <SectionTitle
        sub="Quick Insights & Management Tools"
        heading="Slot Management"
      />

      <div className="flex items-center justify-between mb-12 mt-10">
        <h1 className="text-left font-bold text-2xl lg:text-3xl">
          All Services Slots
        </h1>
        <label
          htmlFor="createSlot-modal"
          onClick={() => {
            setModalType("add");
          }}
          className="flex items-center gap-2 px-4 py-3 btn-custom rounded-full text-white bg-primary"
        >
          <FaPlus className="text-xl mr-1" />
          <span className="mt-1">Create New Slots</span>
        </label>
      </div>
      {modalType === "add" && <CreateSlotModal setModalType={setModalType} />}
    </div>
  );
};

export default SlotManagement;
