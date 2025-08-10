import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-4">
      <h1 className="text-9xl font-extrabold tracking-widest animate-bounce">404</h1>
      <div className="bg-indigo-500 px-2 text-sm rounded rotate-12 absolute">
        Page Not Found
      </div>
      <p className="mt-6 text-lg text-gray-300 text-center max-w-md">
        Oops! The page you are looking for doesn’t exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-8 px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300 shadow-lg"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
