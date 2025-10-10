import { ArrowLeft, Package, Star, MessageSquare, Copy, MapPin, Phone, Truck, Clock, RotateCcw } from "lucide-react";
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useOrderStore } from "store/order/useOrderStore";
import OrderStatusProgress from "./OrderStatusProgress";

const OrderDetails = () => {


    const searchParams = useSearchParams();
    const orderId = searchParams.get("id");
    const orders = useOrderStore((state)=>(state.orders))
    const fetchOrders = useOrderStore((state)=>(state.fetchOrders))

    const orderIds = orders.map((order)=>(console.log(order.id)))

    // Refetch orders if needed
    useEffect(() => {
      fetchOrders()
    }, []);
    
    
    console.log(orderId)
    orders.forEach((order) => console.log("order.id:", typeof order.id, order.id));

    
    console.log('orders', orders)

    console.log('orderId', orderId)
    const order = orders.find(order => order.id === orderId);
    console.log('order', order)

  
  const router = useRouter();

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Order not found or still loading...</p>
      </div>
    );
  }


  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered": return "bg-green-100 text-green-800";
      case "shipped": return "bg-blue-100 text-blue-800";
      case "processing": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-6 max-w-6xl shadow-xl">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => router.push('/profile')}
            className="inline-flex items-center gap-2 rounded-md text-sm font-medium px-3 py-2 hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Orders
          </button>
        </div>

        {/* Progress Bar */}
        <OrderStatusProgress fulfillmentStatus={order.fulfillmentStatus} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          
          {/* Main Section */}
          <div className="lg:col-span-2 space-y-6">

            {/* Order Header */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">Order #{order?.trackingId}</h1>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>Placed on {order?.date}</span>
                    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${getStatusColor(order?.fulfillmentStatus)}`}>
                      {order?.fulfillmentStatus === "delivered" ? "Delivered" : order?.status}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">{order?.total}</p>
                  <p className="text-sm text-gray-500">Total Amount</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium">{'RichField Farms And SmokeHouse LTD'}</p>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-gray-600">{5}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium">Tracking Number</p>
                    <p className="text-sm text-gray-600">{order?.trackingId}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium">Delivery Status</p>
                    <p className="text-sm text-green-600">Delivered May 10, 2024</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg  font-semibold mb-4">Items in this order</h2>
              {order?.items.map((item, index) => (
                <div key={index} className="flex gap-4 p-4 rounded-lg  mb-4">
                  <img
                    src={item.image}
                    alt={item.productName}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-1">{item.productName}</h3>
                    <p className="text-sm text-gray-500 mb-1">{'fresh'}</p>
                    {/* <p className="text-xs text-gray-400">SKU: {'wquzat'}</p> */}
                    <div className="flex justify-between items-center mt-3">
                      <span className="text-sm text-gray-600">Quantity: {item.quantity}</span>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">₦{item.priceInKobo} per <span className="font-bold text-black">{item.unitType}</span></p>
                        <p className="font-semibold text-lg">₦{item.priceInKobo}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex flex-wrap gap-3 mt-6 pt-4 border-t">
                <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-md px-4 py-2 flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  Buy Again
                </button>
                <button className=" border-input bg-background hover:bg-accent hover:text-accent-foreground text-sm font-medium rounded-md px-4 py-2 flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  Rate Product
                </button>
                <button className="border border-input bg-background hover:bg-accent hover:text-accent-foreground text-sm font-medium rounded-md px-4 py-2 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Contact Seller
                </button>
                <button className="border border-input bg-background hover:bg-accent hover:text-accent-foreground text-sm font-medium rounded-md px-4 py-2 flex items-center gap-2">
                  <RotateCcw className="w-4 h-4" />
                  Return/Refund
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Delivery Info */}
            <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Delivery Information
            </h3>

            {order?.shipping ? (
                <div className="space-y-3">
                <div>
                    <p className="font-medium text-gray-900">
                    {order.name || "No name provided"}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                    <Phone className="w-3 h-3 text-gray-400" />
                    <p className="text-sm text-gray-600">
                        {order.shipping.phone || "No phone number"}
                    </p>
                    </div>
                </div>
                <div className="pt-2 border-t">
                  {order.deliveryType === "pickup" ? (
                    <p className="text-sm text-gray-600">
                      {order.shipping.pickupStation || "Pickup station not specified"}
                    </p>
                  ) : (
                    <>
                      <p className="text-sm text-gray-600">
                        {order.shipping.address || "No address"}
                      </p>
                      <p className="text-sm text-gray-600">
                        {order.shipping.state || "Unknown state"}, Nigeria
                      </p>
                    </>
                  )}
                </div>

                </div>
            ) : (
                <p className="text-sm text-gray-500 italic">No delivery information available.</p>
            )}
            </div>


            {/* Payment Summary */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold mb-3">Payment Summary</h3>
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
                  <span className="text-orange-600">₦{order.pricing.total}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg  shadow-sm p-6">
              <h3 className="font-semibold mb-3">Need Help?</h3>
              <div className="space-y-2">
                <button className="w-full border border-input bg-background hover:bg-accent hover:text-accent-foreground text-sm font-medium rounded-md px-4 py-2 flex items-center justify-start gap-2">
                  <Truck className="w-4 h-4" />
                  Track Package
                </button>
                <button className="w-full border border-input bg-background hover:bg-accent hover:text-accent-foreground text-sm font-medium rounded-md px-4 py-2 flex items-center justify-start gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Contact Support
                </button>
                <button className="w-full border border-input bg-background hover:bg-accent hover:text-accent-foreground text-sm font-medium rounded-md px-4 py-2 flex items-center justify-start gap-2">
                  <Copy className="w-4 h-4" />
                  Copy Order ID
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
