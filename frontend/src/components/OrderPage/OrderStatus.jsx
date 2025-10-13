import { LuTruck } from "react-icons/lu";
import { FaRegUser, FaCheck } from "react-icons/fa6";

export default function OrderStatus({ Status }) {
  const renderIcon = (iconType, completed) => {
    switch (iconType) {
      case "check":
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
      case "truck":
        return (
          <div
            className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center ${
              completed
                ? "bg-teal-500 text-white"
                : "border-3 border-[#7D8184] text-[#7D8184] bg-white"
            }`}
          >
            <LuTruck size={20} />
          </div>
        );
      case "user":
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
      case "dot":
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
  };

  return (
    <div className="p-4 sm:p-8 bg-white font-sans">
      <div className="max-w-2xl mx-auto">
        <ul>
          {Status.map((event, index) => (
            <li
              key={event.id}
              className={`relative ${
                index !== Status.length - 1 ? "pb-3" : ""
              }`}
            >
              {index !== Status.length - 1 && (
                <div
                  className={`absolute top-5 left-5 -ml-px w-0.5 h-full bg-[#7D8184] ${
                    Status[index + 1].completed ? "bg-teal-500" : "bg-[#7D8184]"
                  }`}
                />
              )}

              <div className="relative flex space-x-3">
                <div className="">
                  {renderIcon(event.icon, event.completed)}
                </div>

                <div className="min-w-0 flex-1 pt-2">
                  <p className="text-md text-gray-700 pt-1">
                    <span className="font-semibold mr-2 text-black">
                      {event.date} {event.time}
                    </span>

                    <span
                      className={`ml-1 text-gray-600" ${
                        event.completed ? "text-teal-500" : "text-gray-500"
                      }`}
                    >
                      {event.description}
                    </span>
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
