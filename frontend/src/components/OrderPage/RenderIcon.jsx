import { LuTruck } from "react-icons/lu";
import { FaRegUser, FaCheck } from "react-icons/fa6";

export default function RenderIcon({ statusType, completed }) {
  switch (statusType) {
    case "COMPLETED":
      return (
        <div
          className={`z-10 w-10 h-10 rounded-full flex items-center justify-center ${
            completed
              ? "bg-teal-500 text-white"
              : "border-3 border-[#7D8184] text-[#7D8184] bg-white"
          }`}
        >
          <FaCheck size={20} />
        </div>
      );

    case "IN_TRANSIT":
      return (
        <div
          className={`z-10 w-10 h-10 rounded-full flex items-center justify-center ${
            completed
              ? "bg-teal-500 text-white"
              : "border-3 border-[#7D8184] text-[#7D8184] bg-white"
          }`}
        >
          <LuTruck size={20} />
        </div>
      );

    case "ORDER_RECEIVED":
      return (
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center ${
            completed
              ? "bg-teal-500 text-white"
              : "border-3 border-[#7D8184] text-[#7D8184] bg-white"
          }`}
        >
          <FaRegUser size={20} />
        </div>
      );

    default:
      return (
        <div className="w-10 h-10 flex items-center justify-center">
          <div
            className={`w-6 h-6 rounded-full ${
              completed ? "bg-teal-500" : "bg-[#7D8184]"
            }`}
          ></div>
        </div>
      );
  }
}
