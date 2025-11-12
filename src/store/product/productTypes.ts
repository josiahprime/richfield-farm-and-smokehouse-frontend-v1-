export interface EditableImage {
  id?: string;
  file?: File;
  url?: string;
  previewUrl?: string;
  index: number;
}

export interface Discount {
  id: string;
  type: "PERCENTAGE" | "FIXED";
  value: number;
  label: string;
  isActive: boolean;
  startDate: string;
  endDate: string;
  createdAt: string;
}

export interface Product {
  id: string;
  productName: string;
  priceInKobo: number;
  description: string;
  stock: number;
  rating?: number;
  reviews?: string[];
  images: EditableImage[];
  category: string;
  tags: string[];
  unitType: string;
  isVariableWeight: boolean;
  minOrderQuantity: number;
  createdAt: string;
  updatedAt: string;
  favorites: string[];
  isFavorite?: boolean;
  discountId?: string;
  discount?: Discount;
  displayLabel?: string;
}

// export interface DailyDeal {
//   id: number;
//   productId: string;
//   dealDate: string;
//   expiresAt: string;
//   createdAt: string;
//   product: Product;
// }
export interface DailyDeal{
  id: string;
  productName: string;
  description: string;
  priceInKobo: number;
  unitType: string;
  discount: {
    value: number;
    type: 'PERCENTAGE' | 'FIXED';
    label: string;
    startDate: string;
    endDate: string;
  };
  images: {
    url: string;
  }[];
}

export interface HolidayDeals{
  id: string;
  productName: string;
  description: string;
  priceInKobo: number;
  unitType: string;
  discount: {
    value: number;
    type: 'PERCENTAGE' | 'FIXED';
    label: string;
    startDate: string;
    endDate: string;
  };
  images: {
    url: string;
  }[];
}


export interface ProductFormData {
  id: string;
  productName: string;
  priceInKobo: number;
  description: string;
  stock: number;
  images: EditableImage[];
  category: string;
  tags: string[];
  unitType: string;
  isVariableWeight: boolean;
  minOrderQuantity: number;
  discountId?: string | null;
  displayLabel?: "NONE" | "POPULAR" | "DAILY_DEAL" | "NEW_ARRIVAL" | "FEATURED";
}

export interface CreateProductPayload {
  productName: string;
  description: string;
  category: string;
  subCategory?: string;
  stock: number;
  priceInKobo: number;
  unitType: string;
  isVariableWeight: boolean;
  minOrderQuantity?: number;
  tags?: string[];
  images: EditableImage[];
  discountId?: string | null;
  displayLabel?: "NONE" | "POPULAR" | "DAILY_DEAL" | "NEW_ARRIVAL" | "FEATURED";
}

export interface UpdateProductPayload {
  id: string;
  productName?: string;
  description?: string;
  category?: string;
  subCategory?: string;
  stock?: number;
  priceInKobo?: number;
  unitType?: string;
  isVariableWeight?: boolean;
  minOrderQuantity?: number;
  tags?: string[];
  images?: (string | File)[];
  discountId?: string | null;
  displayLabel?: "NONE" | "POPULAR" | "DAILY_DEAL" | "NEW_ARRIVAL" | "FEATURED";
}

/** ✅ For single product endpoint response */
export interface SingleProductResponse {
  success: boolean;
  message?: string;
  product?: Product;
}

/** Store types */
export interface ProductSlice {
  products: Product[] | null;
  singleProduct?: Product | null; // ✅ add this
  dailyDeals: DailyDeal[];
  HolidayDeals: HolidayDeals[];
  popularProducts: Product[];
  favorites: Product[];
  isCreatingProduct: boolean;
  isFetchingProducts: boolean;
  isLoading: boolean;
  isUpdatingProduct: boolean;
  error: string | null;
  success: boolean;
  data: unknown | null;
}

/** Store actions */
export interface ProductActions {
  createProduct: (data: CreateProductPayload) => Promise<void>;
  fetchProducts: (
    filters?: Record<string, string | number | boolean>,
    userId?: string
  ) => Promise<void>;

  /** ✅ New action for single product */
  // fetchProductById: (id: string) => Promise<void>;
  fetchProductById: (id: string, userId?: string) => Promise<void>;

  fetchDailyDeals: () => Promise<void>;
  fetchHolidayDeals: () => Promise<void>;
  fetchPopularProducts: () => Promise<void>;
  deleteProduct: (productId: string) => Promise<boolean>;
  updateProduct: (payload: FormData) => Promise<boolean>;
  setProduct?: (product: Product) => void;
  fetchFavorites: (userId: string) => Promise<void>;
  toggleFavorite: (
    userId: string,
    productId: string
  ) => Promise<"added" | "removed">;
}

/** Combined state */
export type ProductState = ProductSlice & ProductActions;
