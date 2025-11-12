export default function MobileCheckSkeleton() {
  return (
    <div className="w-full min-h-screen bg-gray-100 p-0">

      {/* Desktop Skeleton (full screen) */}
      <div className="hidden md:flex w-full min-h-screen animate-pulse">

        {/* Left side (image/graphic area) */}
        <div className="flex-1 bg-gray-200"></div>

        {/* Right side (form area) */}
        <div className="w-[720px] bg-white p-10 flex flex-col gap-6 justify-center">
          <div className="h-10 bg-gray-300 rounded-md"></div>
          <div className="h-12 bg-gray-300 rounded-md"></div>
          <div className="h-12 bg-gray-300 rounded-md"></div>
          <div className="h-12 bg-gray-300 rounded-md"></div>
        </div>
      </div>

      {/* Mobile Skeleton */}
      <div className="md:hidden w-full min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <div className="w-full min-h-[90vh] max-w-sm bg-white/40 backdrop-blur-md rounded-xl shadow-lg p-6 animate-pulse flex flex-col justify-center">
          <div className="h-10 bg-gray-300 rounded-md mb-6"></div>

          <div className="space-y-4">
            <div className="h-12 bg-gray-300 rounded-md"></div>
            <div className="h-12 bg-gray-300 rounded-md"></div>
            <div className="h-12 bg-gray-300 rounded-md"></div>
          </div>
        </div>
      </div>

    </div>
  );
}
