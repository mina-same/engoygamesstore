// Category Interface
export interface Category {
  id: string;
  name: string;
  nameEn: string;
  categoryDescription: string;
  categoryDescriptionEn: string;
  categoryType: CategoryType;
  billboard: Billboard;
  billboardId: string;
  storeId: string;
  fields: Field[];
  products: Product[];
  createdAt: Date;
  updatedAt: Date;
}

// Billboard Interface
export interface Billboard {
  id: string;
  label: string;
  labelEn: string;
  imageUrl: string;
  isBillboardActive: boolean;
}

// Product Interface
export interface Product {
  id: string;
  name: string;
  nameEn: String;
  category: Category;
  categoryId: string;
  price: number; // Changed to `number` to align with the backend
  productDescription: string;
  productDescriptionEn: string;
  isFeatured: boolean;
  isArchived: boolean;
  quantity: number;
  images: Image[];
  createdAt: Date;
  updatedAt: Date;
}

// Image Interface
export interface Image {
  id: string;
  url: string;
}

// Field Interface
export interface Field {
  id: string;
  categoryId: string;
  fieldName: string;
  fieldType: string;
  options: string[];
}

// Order Interface
export interface Order {
  id: string;
  storeId: string;
  orderItems: OrderItem[];
  isPaid: boolean;
  phone: string;
  address: string;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}

// OrderItem Interface
export interface OrderItem {
  id: string;
  orderId: string;
  product: Product;
  orderFields: OrderField[];
}

// OrderField Interface
export interface OrderField {
  id: string;
  orderItemId: string;
  fieldId: string;
  fieldValue: string;
}

// Enums for Category and Order Status
// types.ts (or wherever you define your types)
export enum CategoryType {
  SHIPPING_LIVE_PROGRAMS = "SHIPPING_LIVE_PROGRAMS",
  SHIPPING_GAMES = "SHIPPING_GAMES",
  SHIPPING_GIFT_CARDS = "SHIPPING_GIFT_CARDS",
  SHIPPING_GAMES_CARDS = "SHIPPING_GAMES_CARDS",
  SHIPPING_DIGITAL_SUBSCRIPTIONS = "SHIPPING_DIGITAL_SUBSCRIPTIONS",
}

// Mapping for display names
export const CategoryDisplayNames: Record<CategoryType, string> = {
  [CategoryType.SHIPPING_LIVE_PROGRAMS]: "شحن برامج لايف",
  [CategoryType.SHIPPING_GAMES]: "شحن الألعاب",
  [CategoryType.SHIPPING_GIFT_CARDS]: "شحن بطاقات الهداياالرقمية",
  [CategoryType.SHIPPING_GAMES_CARDS]: "شحن بطاقات الألعاب",
  [CategoryType.SHIPPING_DIGITAL_SUBSCRIPTIONS]: "شحن الاشتراكات الرقمية",
};


export enum OrderStatus {
  ORDERED = "ORDERED",
  PROCESSING = "PROCESSING",
  DONE = "DONE",
}
