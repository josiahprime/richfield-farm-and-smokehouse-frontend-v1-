// store/checkout/checkoutTypes.ts
export interface PaystackPaymentPayload {
  name: string;
  email: string;
  phone: string;
  address: string;
  postalCode?: string;
  state?: string;
  city?: string;
  landmark?: string;
  extraInstructions?: string;
  pickupStation?: string;
  deliveryType: "home" | "pickup";
  amount: number;
  items: CheckoutItem[];
  subtotal?: number;
  taxAmount?: number;
  taxRate?: number;
  shippingFee?: number;
  total?: number;
}

export interface CheckoutItem {
  id: string;
  productName: string;
  priceInKobo: number;
  quantity: number;
  image: string;
  unitType: string;
}

export interface CheckoutState {
  isPaying: boolean;
  amount: number;
  email: string;
  phone: string;
  name: string;
  items: CheckoutItem[];
  status: 'loading' | 'success' | 'error';
  message: string;
}

export interface CheckoutActions {
  setAmount: (amount: number) => void;
  setItems: (items: CheckoutItem[]) => void;
  handlePaystackPayment: (payload: PaystackPaymentPayload) => Promise<void>; // 👈 modified
  verifyPayment: (reference: string) => Promise<void>;
}
