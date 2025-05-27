import { ObjectId } from 'mongodb';

export interface ProductDimensions {
  single?: string;
  double?: string;
  king?: string;
  superKing?: string;
  open?: string;
  folded?: string;
}

export interface ProductDescription {
  main: string;
  features: string[];
}

export interface ProductAdditional {
  material: string;
  dimensions: ProductDimensions;
  washing?: string;
  colors?: string;
  note?: string;
}

export interface Product {
  _id?: ObjectId;
  title: string;
  price: number;
  oldPrice: number;
  discount: string;
  images: string[];
  description: ProductDescription;
  additional: ProductAdditional;
  category: string;
  isBestSeller: boolean;
  createdAt: Date;
  updatedAt: Date;
} 