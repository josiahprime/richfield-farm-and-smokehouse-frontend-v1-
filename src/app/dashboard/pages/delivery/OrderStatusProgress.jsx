import { motion } from "framer-motion";

const statuses = ["Processing", "Shipped", "Out for Delivery", "Delivered"];

const OrderStatusProgress = ({ currentStatus }) => {
  const currentIndex = statuses.indexOf(currentStatus);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      <div className="relative flex justify-between items-center">
        {statuses.map((status, index) => {
          const isActive = index <= currentIndex;
          const isCurrent = index === currentIndex;
          const isCompleted = index < currentIndex;

          return (
            <div key={status} className="relative flex-1 flex flex-col items-center">
              {/* Connector line to the next step */}
              {index !== statuses.length - 1 && (
                <div
                  className={`absolute top-4 left-1/2 h-1 w-full transform -translate-x-0.5 ${
                    index < currentIndex ? "bg-blue-500" : "bg-gray-300"
                  }`}
                  style={{ zIndex: 0, width: "100%" }}
                ></div>
              )}

              {/* Checkpoint */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.2 }}
                className={`z-10 w-8 h-8 rounded-full border-2 flex items-center justify-center font-semibold ${
                  isActive
                    ? "border-blue-500 bg-blue-500 text-white"
                    : "border-gray-300 bg-white text-gray-400"
                }`}
              >
                {isCompleted ? "✓" : index + 1}
              </motion.div>

              {/* Status label */}
              <span
                className={`mt-2 text-sm text-center ${
                  isCurrent ? "text-blue-600 font-semibold" : "text-gray-500"
                }`}
              >
                {status}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderStatusProgress;
