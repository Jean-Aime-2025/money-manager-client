import { assets } from "../assets/assets";

const AuthLayout = ({ children }) => {
  return (
    <div className="h-screen w-full flex overflow-hidden">

      {/* LEFT SIDE */}
      <div className="hidden md:flex w-1/2 relative">
        <img
          src={assets.auth_bg}
          alt="auth_bg"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/80" />

        <div className="relative z-10 flex flex-col justify-end h-full p-10 pb-[100px] text-white">
          <div>
            <h1 className="text-4xl lg:text-4xl xl:text-5xl font-bold mb-4">
              Track your money smartly 
            </h1>
            <p className="text-base lg:text-lg xl:text-xl opacity-95 leading-relaxed max-w-2/3">
              Manage income, expenses, and insights in one place. Get complete control over your finances.
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-50 p-6">
        {children}
      </div>

    </div>
  );
};

export default AuthLayout;