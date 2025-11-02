"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  Package,
  Star,
  MessageSquare,
  Copy,
  MapPin,
  Phone,
  Truck,
  Clock,
  RotateCcw,
} from "lucide-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useOrderStore } from "store/order/useOrderStore";
import OrderStatusProgress from "./OrderStatusProgress";

interface OrderDetailsProps {
  orderId: string;
}

const OrderDetails = ({ orderId }: OrderDetailsProps) => {
  const orders = useOrderStore((state) => state.orders);
  const fetchOrders = useOrderStore((state) => state.fetchOrders);

  useEffect(() => {
    fetchOrders();
  }, []);

  const order = orders.find((order) => order.id === orderId);
  const router = useRouter();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "processing":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-emerald-100 to-white">
        <p className="text-gray-600 text-lg font-medium">
          Order not found or still loading...
        </p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen shadow rounded-md p-6">
      <motion.div
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Back Button */}
        <button
          onClick={() => router.push("/profile")}
          className="inline-flex items-center gap-2 text-emerald-700 hover:text-emerald-900 font-medium mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Orders
        </button>

        {/* Progress Bar */}
        <OrderStatusProgress fulfillmentStatus={order.fulfillmentStatus} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Overview */}
            <motion.div
              className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100"
              whileHover={{ scale: 1.01 }}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-1">
                    Order #{order.trackingId}
                  </h1>
                  <p className="text-sm text-gray-500 mb-2">
                    Placed on {order.createdAt}
                  </p>
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(
                      order.fulfillmentStatus
                    )}`}
                  >
                    {order.fulfillmentStatus || "Processing"}
                  </span>
                </div>

                <div className="text-right">
                  <p className="text-2xl font-bold text-emerald-700">
                    ₦{order.pricing.total}
                  </p>
                  <p className="text-sm text-gray-500">Total Amount</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-800">
                      RichField Farms & SmokeHouse LTD
                    </p>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-gray-600">5.0</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium">Tracking Number</p>
                    <p className="text-sm text-gray-600">{order.trackingId}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium">Delivery Status</p>
                    <p className="text-sm text-green-600">
                      Delivered May 10, 2024
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Items Section */}
            <motion.div
              className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100"
              whileHover={{ scale: 1.01 }}
            >
              <h2 className="text-lg font-semibold mb-4 text-gray-800">
                Items in this order
              </h2>
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-4 p-4 bg-gray-50 rounded-xl mb-4"
                >
                  <img
                    src={item.image.url}
                    alt={item.productName}
                    className="w-20 h-20 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">
                      {item.productName}
                    </h3>
                    <p className="text-sm text-gray-500">fresh</p>
                    <div className="flex justify-between items-center mt-3">
                      <span className="text-sm text-gray-600">
                        Quantity: {item.quantity}
                      </span>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">
                          ₦{item.priceInKobo} per{" "}
                          <span className="font-bold text-gray-800">
                            {item.unitType}
                          </span>
                        </p>
                        <p className="font-semibold text-lg text-emerald-700">
                          ₦{item.priceInKobo}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex flex-wrap gap-3 mt-6 pt-4 border-t border-gray-100">
                <button className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-xl px-4 py-2 flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  Buy Again
                </button>
                <button className="border border-emerald-200 hover:bg-emerald-50 text-emerald-700 text-sm font-medium rounded-xl px-4 py-2 flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  Rate Product
                </button>
                <button className="border border-emerald-200 hover:bg-emerald-50 text-emerald-700 text-sm font-medium rounded-xl px-4 py-2 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Contact Seller
                </button>
                <button className="border border-emerald-200 hover:bg-emerald-50 text-emerald-700 text-sm font-medium rounded-xl px-4 py-2 flex items-center gap-2">
                  <RotateCcw className="w-4 h-4" />
                  Return / Refund
                </button>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Delivery Info */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <h3 className="font-semibold mb-3 flex items-center gap-2 text-gray-800">
                <MapPin className="w-4 h-4 text-emerald-600" />
                Delivery Information
              </h3>
              {order.shipping ? (
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium text-gray-900">
                      {order.name || "No name provided"}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Phone className="w-3 h-3 text-gray-400" />
                      <p className="text-gray-600">
                        {order.shipping.phone || "No phone number"}
                      </p>
                    </div>
                  </div>
                  <div className="pt-2 border-t">
                    {order.deliveryType === "pickup" ? (
                      <p className="text-gray-600">
                        {order.shipping.pickupStation ||
                          "Pickup station not specified"}
                      </p>
                    ) : (
                      <>
                        <p className="text-gray-600">
                          {order.shipping.address || "No address"}
                        </p>
                        <p className="text-gray-600">
                          {order.shipping.state || "Unknown state"}, Nigeria
                        </p>
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 italic text-sm">
                  No delivery information available.
                </p>
              )}
            </div>

            {/* Payment Summary */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <h3 className="font-semibold mb-3 text-gray-800">
                Payment Summary
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Item total</span>
                  <span>₦{order.pricing.subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping fee</span>
                  <span>₦{order.pricing.shippingFee}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax Amount</span>
                  <span>₦{order.pricing.taxAmount}</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span className="text-emerald-700">
                    ₦{order.pricing.total}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <h3 className="font-semibold mb-3 text-gray-800">Need Help?</h3>
              <div className="space-y-2">
                <button className="w-full border border-emerald-200 hover:bg-emerald-50 text-emerald-700 text-sm font-medium rounded-xl px-4 py-2 flex items-center justify-start gap-2">
                  <Truck className="w-4 h-4" />
                  Track Package
                </button>
                <button className="w-full border border-emerald-200 hover:bg-emerald-50 text-emerald-700 text-sm font-medium rounded-xl px-4 py-2 flex items-center justify-start gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Contact Support
                </button>
                <button className="w-full border border-emerald-200 hover:bg-emerald-50 text-emerald-700 text-sm font-medium rounded-xl px-4 py-2 flex items-center justify-start gap-2">
                  <Copy className="w-4 h-4" />
                  Copy Order ID
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default OrderDetails
