import React from "react";
import { motion } from "framer-motion";

const steps = [
  { key: "REQUEST_SUBMITTED", label: "Request Submitted" },
  { key: "EXECUTIVE_CONTACTED", label: "Executive Contacted You" },
  { key: "JOB_ID_ASSIGNED", label: "Job ID Assigned" },
  { key: "ENGINEER_ASSIGNED", label: "Engineer Assigned" },
  { key: "JOB_DONE", label: "Job Completed" },
];

const StatusTracker = ({ trackingStatus, trackingHistory }) => {
  const currentIndex = steps.findIndex(
    (step) => step.key === trackingStatus
  );

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-xl">
      {steps.map((step, index) => {
        const isCompleted = index < currentIndex;
        const isCurrent = index === currentIndex;

        const historyItem = trackingHistory?.find(
          (h) => h.status === step.key
        );

        return (
          <motion.div
            key={step.key}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.15 }}
            className="flex items-start gap-4 mb-8 relative"
          >
            {/* Vertical Line */}
            {index !== steps.length - 1 && (
              <motion.div
                initial={{ height: 0 }}
                animate={{
                  height: isCompleted ? "100%" : "0%",
                }}
                transition={{ duration: 0.5 }}
                className="absolute left-4 top-6 w-1 bg-green-500"
                style={{ minHeight: "60px" }}
              />
            )}

            {/* Circle */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.15 }}
              className={`w-8 h-8 flex items-center justify-center rounded-full text-white text-sm font-bold z-10
                ${
                  isCompleted
                    ? "bg-green-500"
                    : isCurrent
                    ? "bg-indigo-600"
                    : "bg-gray-300"
                }
              `}
            >
              {isCompleted ? "✓" : index + 1}
            </motion.div>

            {/* Text */}
            <div>
              <p
                className={`font-semibold transition-colors duration-300 ${
                  isCurrent ? "text-indigo-600" : "text-gray-800"
                }`}
              >
                {step.label}
              </p>

              {historyItem && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-xs text-gray-500 mt-1"
                >
                  {new Date(historyItem.updatedAt).toLocaleString()}
                </motion.p>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default StatusTracker;
