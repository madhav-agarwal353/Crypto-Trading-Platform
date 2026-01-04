import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="
      relative min-h-screen
      flex items-center justify-center
      bg-black text-white
      overflow-hidden p-6
    ">
      {/* BIG 404 */}
      <div
        className="
          absolute inset-0 flex items-center justify-center
          text-[320px] md:text-[420px]
          font-extrabold
          text-transparent bg-clip-text
          bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-400
          opacity-20 select-none
        "
      >
        404
      </div>

      {/* Blue radial glow */}
      <div
        className="
          absolute inset-0
          bg-[radial-gradient(circle,rgba(59,130,246,0.25)_0%,rgba(0,0,0,1)_70%)]
        "
      />

      {/* Content */}
      <div className="relative z-10 text-center max-w-md space-y-4">
        <h1 className="text-4xl font-bold">
          We lost this page
        </h1>

        <p className="text-gray-400">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>

        <Button
          className="
            mt-6 px-6 py-3
            text-lg font-semibold
            bg-blue-600 hover:bg-blue-700
            text-white rounded-lg
            transition
            shadow-[0_10px_30px_rgba(59,130,246,0.45)]
          "
          onClick={() => {
            localStorage.getItem("jwt") != null ?
              navigate("/") :
              navigate("/login");
          }}>
          {localStorage.getItem("jwt") ? "← Back to Home" : "← Back to Login"}
        </Button>
    </div>
    </div >
  );
};

export default NotFound;
