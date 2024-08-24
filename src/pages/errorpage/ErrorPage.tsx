import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const ErrorPage = () => {
  return (
    <div className="relative h-screen">
      <img
        src="https://plus.unsplash.com/premium_photo-1661373031521-65de23d71eab?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        className="absolute inset-0 object-cover w-full h-full"
        alt=""
      />
      <div className="relative bg-gray-900 bg-opacity-75 h-full">
        <div className="flex flex-col justify-center items-center h-full max-w-2xl mx-auto">
          <h1 className="mb-5 text-6xl md:text-8xl font-bold text-white text-center">
            404
          </h1>
          <h1 className="mb-5 text-4xl md:text-6xl font-bold text-white text-center">
            Page Not Found
          </h1>
          <div className="divider w-80 mx-auto text-white"></div>
          <p className="mb-5 md:text-lg text-white text-center mx-5">
            Sorry but we couldn&apos;t find the page you are looking for. Please
            check to make sure you&apos;ve typed the URL correctly.
          </p>
          <Link to="/">
            <button className="bg-primary text-[white] px-4 py-3 rounded-lg btn-custom flex items-center group font-semibold">
              <FaHome className="text-white mr-2 mb-2 group-hover:text-primary" />{" "}
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
