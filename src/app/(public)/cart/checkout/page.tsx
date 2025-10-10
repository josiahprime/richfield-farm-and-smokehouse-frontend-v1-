'use client'

import { useState, useEffect } from "react";
import { useCartStore } from "store/cart/useCartStore";
import { useCheckoutStore } from "store/checkout/useCheckoutStore";
import { ShoppingBag, CreditCard, Package, CheckCircle, Lock, Star } from "lucide-react";
import { toast } from "react-hot-toast";
import OrderSummary from "app/components/Checkout/OrderSummary";
import ShippingForm from "app/components/Checkout/ShippingForm";
import PaymentSection from "app/components/Checkout/PaymentSection";
import { useOrderStore } from "store/order/useOrderStore";




export type FormField = "firstName" | "lastName" | "city" | "state"  | "email" | "phone" | "address" | "extraInstructions" | "landmark" | "postalCode" | "pickupStation";

const CheckoutPage = () => {
  const [deliveryType, setDeliveryType] = useState<"home" | "pickup">("home");
  const [calculationDone, setCalculationDone] = useState(false);
  const cartItems = useCartStore((state) => state.items);
  const previewOrder = useOrderStore((state)=>(state.previewOrder))
  const items = useCartStore((state)=>(state.items))
  const { handlePaystackPayment, verifyPayment } = useCheckoutStore();
  const setAmount = useCheckoutStore((state)=>(state.setAmount))
  const amount = useCheckoutStore((state)=>(state.amount))
  const preview = useOrderStore((state)=>(state.preview)) 
  const setItems = useCheckoutStore((state)=>(state.setItems))
  const isPaying = useCheckoutStore((state)=>(state.isPaying))
  


  const [currentStep, setCurrentStep] = useState(1);
  console.log('items', items)

  const [formData, setFormData] = useState<Record<FormField, string>>({
    firstName: '',
    lastName: '',
    city: '',
    state: '',
    email: "",
    phone: "",
    address: "",
    landmark: "",
    extraInstructions: "",
    postalCode: "",
    pickupStation: ""
  });

    useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    script.onload = () => console.log("Paystack SDK Loaded");
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (calculationDone && preview?.total) {
      setAmount(preview.total);
    }
  }, [calculationDone, preview, setAmount]);


  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  // };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };





  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('handle submit was triggered')
    const { firstName, lastName, email, phone, address, postalCode, state, city, pickupStation, landmark, extraInstructions } = formData;

    const name = `${firstName} ${lastName}`;

    if (deliveryType === 'home') {
      if (!email || !name || !phone || !address || !postalCode || !state || !city) {
        toast.error("Please fill out all required home delivery fields");
        return;
      }
    } else {
      if (!email || !name || !phone) {
        toast.error("Please fill out all required pickup fields");
        return;
      }
    }

    
    if (!window.PaystackPop) {
      toast.error("Paystack SDK not loaded. Please refresh and try again.");
      return;
    }

    if (!preview?.total) {
      toast.error("Total not calculated yet. Please wait...");
      return;
    }

    console.log('subtotal',preview.subtotal)

    handlePaystackPayment({
      name,
      email,
      phone,
      address,
      postalCode,
      state,
      city,
      landmark,
      extraInstructions,
      pickupStation,
      deliveryType,
      amount: preview?.total,
      subtotal: preview?.subtotal,
      taxAmount: preview?.taxAmount,
      taxRate: preview?.taxRate,
      shippingFee: preview?.shippingFee,
      total: preview?.total,
      items
    });

  };



  const steps = [
    { number: 1, title: "Shipping", icon: Package },
    { number: 2, title: "Payment", icon: CreditCard },
    { number: 3, title: "Complete", icon: CheckCircle }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-green-600 to-emerald-700 p-2 rounded-xl">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent">
                Elegant Checkout
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              <Lock className="w-4 h-4 text-green-600" />
              <span className="text-sm text-gray-600 font-medium">Secure Checkout</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center mb-12">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                currentStep >= step.number 
                  ? 'bg-gradient-to-r from-green-600 to-emerald-700 border-transparent text-white shadow-lg' 
                  : 'border-gray-300 text-gray-400 bg-white'
              }`}>
                <step.icon className="w-5 h-5" />
              </div>
              <div className="ml-3 mr-8">
                <p className={`text-sm font-medium ${currentStep >= step.number ? 'text-green-600' : 'text-gray-400'}`}>
                  Step {step.number}
                </p>
                <p className={`text-sm ${currentStep >= step.number ? 'text-gray-900' : 'text-gray-400'}`}>
                  {step.title}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-16 h-0.5 transition-all duration-300 ${
                  currentStep > step.number ? 'bg-gradient-to-r from-green-600 to-emerald-700' : 'bg-gray-300'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-8">
            {currentStep === 1 && (
              <ShippingForm 
                formData={formData}
                handleChange={handleChange}
                deliveryType={deliveryType}
                onNext={() => setCurrentStep(2)}
                setDeliveryType={setDeliveryType}
                cartItems={cartItems}
                previewOrder={previewOrder} 
                setCalculationDone={setCalculationDone}
              />
            )}
            
            {currentStep === 2 && (
              <PaymentSection 
                amount={amount}
                isPaying={isPaying}
                handleSubmit={handleSubmit}
                onBack={() => setCurrentStep(1)}
              />
            )}

            {currentStep === 3 && (
              <div className="bg-white rounded-3xl p-8 shadow-2xl border border-white/20">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-green-600 to-emerald-700 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Order Complete!</h2>
                  <p className="text-gray-600 mb-8">Thank you for your purchase. Your order has been confirmed and will be shipped soon.</p>
                  
                  <div className="flex items-center justify-center space-x-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  
                  <button className="bg-gradient-to-r from-green-600 to-emerald-700 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200">
                    Continue Shopping
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <OrderSummary items={cartItems} amount={amount} calculationDone={calculationDone} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;


