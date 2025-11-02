'use client'
import { CreditCard, Shield, ArrowLeft, Loader2 } from "lucide-react";
import { useOrderStore } from "store/order/useOrderStore";
import { formatCurrency } from "utils/FormatCurrency";

interface PaymentSectionProps {
  amount: number;
  isPaying: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void | Promise<void>; 
  onBack: () => void;
}

const PaymentSection = ({isPaying, handleSubmit, onBack }: PaymentSectionProps) => {
  const preview = useOrderStore((state)=>(state.preview))

  return (
    <div className="bg-white rounded-3xl p-8 shadow-2xl border border-white/20">
      <div className="flex items-center space-x-4 mb-8">
        <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-3 rounded-2xl">
          <CreditCard className="w-6 h-6 text-green-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Payment Details</h2>
          <p className="text-gray-600">Secure payment processing</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Payment Method Selection */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Payment Method</h3>
          <div className="grid gap-4">
            <label className="relative flex items-center p-4 border border-gray-200 rounded-xl cursor-pointer hover:border-indigo-300 transition-colors">
              <input type="radio" name="payment" value="card" defaultChecked className="sr-only" />
              <div className="w-5 h-5 border-2 border-green-600 rounded-full flex items-center justify-center mr-4">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
              </div>
              <div className="flex items-center space-x-3">
                <CreditCard className="w-6 h-6 text-green-600" />
                <div>
                  <p className="font-semibold text-gray-900">Credit/Debit Card</p>
                  <p className="text-sm text-gray-600">Paystack secure payment</p>
                </div>
              </div>
            </label>
          </div>
        </div>

        {/* Security Badge */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
          <div className="flex items-center space-x-3">
            <Shield className="w-6 h-6 text-green-600" />
            <div>
              <p className="font-semibold text-green-800">Secure Payment</p>
              <p className="text-sm text-green-600">Your payment information is encrypted and secure</p>
            </div>
          </div>
        </div>

        {/* Order Total */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-200">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-900">Total Amount</span>
            <span className="md:text-2xl text-xl  font-bold bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent">
              {formatCurrency(preview?.total)}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4 pt-6">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 bg-gray-100 text-gray-700 md:py-4 py-2 md:px-8 px-4 rounded-xl font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          
          <button
            type="submit"
            disabled={isPaying}
            className="flex-2  bg-gradient-to-r from-green-600 to-emerald-700 text-white md:py-4 py-2 md:px-8 px-4  rounded-xl font-semibold hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isPaying ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <span>Complete Payment</span>
                <CreditCard className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentSection;
