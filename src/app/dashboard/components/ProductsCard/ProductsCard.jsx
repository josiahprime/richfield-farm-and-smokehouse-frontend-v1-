const ProductCard = ({ id, imageUrl, title, price, description, stock, onEdit, onDelete }) => {
  return (
    <div className="relative max-w-xs bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
      {/* Product Image */}
      <div className="h-48 w-full overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Details */}
      <div className="p-4 flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900 truncate">{title}</h2>
          <span className="text-green-600 font-bold text-base">₦{price}</span>
        </div>

        <p className="text-sm text-gray-600 line-clamp-2">{description}</p>

        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">Stock: {stock}</span>
          <span className={stock > 0 ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
            {stock > 0 ? "In Stock" : "Out of Stock"}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="absolute top-2 w-full px-2 flex justify-between items-center">
        <button
          onClick={() => onEdit(id)}
          className="bg-white p-1 rounded-full shadow hover:bg-green-100 transition"
          title="Edit"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20"
            viewBox="0 -960 960 960"
            width="20"
            fill="#16a34a"
          >
            <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
          </svg>
        </button>

        <button
          onClick={() => onDelete(id)}
          className="bg-white p-1 rounded-full shadow hover:bg-red-100 transition"
          title="Delete"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20"
            viewBox="0 -960 960 960"
            width="20"
            fill="#dc2626"
          >
            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
