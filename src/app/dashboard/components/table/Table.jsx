import React from "react";

const rows = [
  {
    id: 1143155,
    product: "Acer Nitro 5",
    img: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg",
    customer: "John Smith",
    date: "1 March",
    amount: 785,
    method: "Cash on Delivery",
    status: "Approved",
  },
  {
    id: 2235235,
    product: "Playstation 5",
    img: "https://m.media-amazon.com/images/I/31JaiPXYI8L._AC_UY327_FMwebp_QL65_.jpg",
    customer: "Michael Doe",
    date: "1 March",
    amount: 900,
    method: "Online Payment",
    status: "Pending",
  },
  {
    id: 2342353,
    product: "Redragon S101",
    img: "https://m.media-amazon.com/images/I/71kr3WAj1FL._AC_UY327_FMwebp_QL65_.jpg",
    customer: "John Smith",
    date: "1 March",
    amount: 35,
    method: "Cash on Delivery",
    status: "Pending",
  },
  {
    id: 2357741,
    product: "Razer Blade 15",
    img: "https://m.media-amazon.com/images/I/71wF7YDIQkL._AC_UY327_FMwebp_QL65_.jpg",
    customer: "Jane Smith",
    date: "1 March",
    amount: 920,
    method: "Online",
    status: "Approved",
  },
  {
    id: 2342355,
    product: "ASUS ROG Strix",
    img: "https://m.media-amazon.com/images/I/81hH5vK-MCL._AC_UY327_FMwebp_QL65_.jpg",
    customer: "Harold Carol",
    date: "1 March",
    amount: 2000,
    method: "Online",
    status: "Pending",
  },
];

const statusStyles = {
  Approved: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Declined: "bg-red-100 text-red-700",
};

const OrdersTable = () => {
  return (
    <div className="bg-white shadow-xl rounded-xl p-6 overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4">Latest Orders</h2>
      <table className="min-w-full table-auto text-sm text-gray-700">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="py-3 px-4">Tracking ID</th>
            <th className="py-3 px-4">Product</th>
            <th className="py-3 px-4">Customer</th>
            <th className="py-3 px-4">Date</th>
            <th className="py-3 px-4">Amount</th>
            <th className="py-3 px-4">Payment</th>
            <th className="py-3 px-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.id}
              className="border-b hover:bg-gray-50 transition duration-200"
            >
              <td className="py-3 px-4 font-medium">{row.id}</td>
              <td className="py-3 px-4 flex items-center gap-3">
                <img
                  src={row.img}
                  alt={row.product}
                  className="w-12 h-12 rounded-md object-cover border"
                />
                {row.product}
              </td>
              <td className="py-3 px-4">{row.customer}</td>
              <td className="py-3 px-4">{row.date}</td>
              <td className="py-3 px-4">${row.amount}</td>
              <td className="py-3 px-4">{row.method}</td>
              <td className="py-3 px-4">
                <span
                  className={`px-3 py-1 rounded-full font-semibold text-xs ${statusStyles[row.status]}`}
                >
                  {row.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;

