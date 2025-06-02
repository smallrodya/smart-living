export interface Product {
  // ... existing fields ...
  // Outdoor specific
  outdoorPrice?: {
    sku: string;
    regularPrice: number;
    salePrice: number;
    stock: number;
  };
  outdoorColors?: string[];
  // ... existing fields ...
} 