import { MdKeyboardArrowUp } from "react-icons/md";
import { FaUser, FaWallet, FaShoppingCart, FaDollarSign } from "react-icons/fa";

const Widget = ({ type }) => {
  let data;

  const amount = 100;
  const diff = 20;

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        link: "See all users",
        icon: (
          <FaUser
            className="text-[18px] p-2 rounded-md self-end"
            style={{ color: "crimson", backgroundColor: "rgba(255, 0, 0, 0.2)" }}
          />
        ),
      };
      break;
    case "order":
      data = {
        title: "ORDERS",
        isMoney: false,
        link: "View all orders",
        icon: (
          <FaShoppingCart
            className="text-[18px] p-2 rounded-md self-end"
            style={{ color: "goldenrod", backgroundColor: "rgba(218, 165, 32, 0.2)" }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        title: "EARNINGS",
        isMoney: true,
        link: "View net earnings",
        icon: (
          <FaDollarSign
            className="text-[18px] p-2 rounded-md self-end"
            style={{ color: "green", backgroundColor: "rgba(0, 128, 0, 0.2)" }}
          />
        ),
      };
      break;
    case "balance":
      data = {
        title: "BALANCE",
        isMoney: true,
        link: "See details",
        icon: (
          <FaWallet
            className="text-[18px] p-2 rounded-md self-end"
            style={{ color: "purple", backgroundColor: "rgba(128, 0, 128, 0.2)" }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="flex justify-between flex-1 p-4 h-[100px] rounded-lg shadow-md bg-white">
      <div className="flex flex-col justify-between">
        <span className="text-sm font-semibold text-gray-500">{data.title}</span>
        <span className="text-2xl font-light">
          {data.isMoney && "$"} {amount}
        </span>
        <span className="text-xs text-blue-500 cursor-pointer hover:underline w-max">
          {data.link}
        </span>
      </div>
      <div className="flex flex-col justify-between items-end">
        <div className="flex items-center text-sm font-medium text-green-600">
          <MdKeyboardArrowUp />
          {diff}%
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
