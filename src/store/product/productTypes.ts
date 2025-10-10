export interface EditableImage {
  id?: string;
  file?: File;
  url?: string;
  previewUrl?: string;
  index: number;
}

export interface Discount {
  id: string;
  name: string;
  percentage: number;
  validFrom: string;
  validUntil: string;
}

export interface Product {
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
  createdAt: string;
  updatedAt: string;
  favorites: string[];
  isFavorite?: boolean;
  discount: string[]
  displayLabel: string;
}


export interface DailyDeal {
  id: string;
  productId: string;
  dealDate: string;
  isExpired: boolean;
  product: Product;
  discountPercentage: number;
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
  discountId?: string | null; // 👈 only this
  displayLabel?: "NONE" | "POPULAR" | "DAILY_DEAL" | "NEW_ARRIVAL" | "FEATURED";
  
}

// export interface CreateProductPayload {
//   formData: {
//     id?: string;
//     productName: string;
//     description: string;
//     category: string;
//     subCategory: string;
//     stock: number;
//     priceInKobo: string;
//     unitType: string;
//     isVariableWeight: boolean;
//     minOrderQuantity?: number;

//     // 🆕 Match frontend form
//     discountType?: "PERCENTAGE" | "FIXED";
//     discountValue?: number;

//     // 🆕 Display label added
//     displayLabel?: "NONE" | "POPULAR" | "DAILY_DEAL" | "NEW_ARRIVAL" | "FEATURED";
//   };
//   stock: number;
//   tags: string[];
//   formattedImages: EditableImage[];
// }




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
  discountId?: string | null; // 👈 only this
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
  discountId?: string | null; // 👈 only this
  displayLabel?: "NONE" | "POPULAR" | "DAILY_DEAL" | "NEW_ARRIVAL" | "FEATURED";
}




// Slice = State
export interface ProductSlice {
  products: Product[] | null;
  dailyDeals: DailyDeal[];
  popularProducts: Product[];
  favorites: Product[]; 
  isCreatingProduct: boolean;
  isFetchingProducts: boolean;
  isLoading: boolean;
  isUpdatingProduct: boolean;
  error: string | null;
  success: boolean;
  data: any | null;
}

// Slice = Actions
export interface ProductActions {
  createProduct: (data: CreateProductPayload) => Promise<void>;
  fetchProducts: (filters?: Record<string, any>, userId?:string) => Promise<void>;
  fetchDailyDeals: () => Promise<void>;
  fetchPopularProducts: () => Promise<void>;
  deleteProduct: (productId: string) => Promise<boolean>;
  updateProduct: (data: UpdateProductPayload) => Promise<boolean>;
  setProduct?: (product: Product) => void;
  fetchFavorites: (userId: string) => Promise<void>;
  toggleFavorite: (userId: string, productId: string) => Promise<"added" | "removed">;
}

// Combined state
export type ProductState = ProductSlice & ProductActions;
