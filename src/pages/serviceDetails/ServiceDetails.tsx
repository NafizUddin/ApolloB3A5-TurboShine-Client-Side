import { useParams } from "react-router-dom";

const ServiceDetails = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Hello, ServiceDetails </h1>
    </div>
  );
};

export default ServiceDetails;
