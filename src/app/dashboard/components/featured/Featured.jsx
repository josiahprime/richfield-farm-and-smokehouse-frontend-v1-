'use client';
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const Featured = () => {

  return (
    <div className="flex-[2] shadow-md p-4 bg-white rounded-lg">
      <div className="flex items-center justify-between text-gray-500">
        <h1 className="text-base font-medium">Total Revenue</h1>
        <BsThreeDotsVertical size={16} />
      </div>

      <div className="flex flex-col items-center justify-center gap-4 mt-4">
        <div className="w-24 h-24">
          <CircularProgressbar value={70} text={"70%"} strokeWidth={5} />
        </div>
        <p className="text-gray-500 font-medium">Total sales made today</p>
        <p className="text-2xl font-semibold">$420</p>
        <p className="text-xs text-gray-400 text-center font-light">
          Previous transactions processing. Last payments may not be included.
        </p>

        <div className="w-full flex justify-between mt-4">
          <div className="text-center">
            <div className="text-sm text-gray-500">Target</div>
            <div className="flex items-center justify-center text-red-500 mt-2 text-sm">
              <FaArrowDown size={16} />
              <span className="ml-1">$12.4k</span>
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-500">Last Week</div>
            <div className="flex items-center justify-center text-green-500 mt-2 text-sm">
              <FaArrowUp size={16} />
              <span className="ml-1">$12.4k</span>
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-500">Last Month</div>
            <div className="flex items-center justify-center text-green-500 mt-2 text-sm">
              <FaArrowUp size={16} />
              <span className="ml-1">$12.4k</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
