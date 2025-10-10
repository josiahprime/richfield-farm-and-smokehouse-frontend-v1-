export interface CartItem {
  id: string;
  productName: string;
  priceInKobo : number;
  image: string;
  quantity: number;
  unitType: string;
}

export interface CartState {
  items: CartItem[];
}

export interface CartActions {
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  incrementQuantity: (id: string) => void;
  decrementQuantity: (id: string) => void;
}
