import React from "react";

interface LoadingSpinnerProps {
  loading: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ loading }) => {
  if (!loading) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="text-center space-y-4">
        {/* Book flipping animation */}
        <div className="relative w-20 h-20 mx-auto">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-[#344CB7] border-t-transparent rounded-full animate-spin"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl">📚</span>
          </div>
        </div>

        {/* Text with fading animation */}
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-white animate-pulse">
            Loading Stories...
          </h3>
          <p className="text-sm text-gray-200">
            Curating your literary journey
          </p>
        </div>

        {/* Subtle page turn animation */}
        <div className="flex justify-center space-x-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-white rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
