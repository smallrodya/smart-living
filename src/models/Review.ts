import { ObjectId } from 'mongodb';

export interface Review {
  _id?: ObjectId;
  productId: ObjectId | string;
  userId?: ObjectId | string | null;
  userName?: string;
  rating: number;
  text: string;
  createdAt: Date;
  approved: boolean;
} 