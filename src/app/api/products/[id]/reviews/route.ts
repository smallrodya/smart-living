import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { Review } from '@/models/Review';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { db } = await connectToDatabase();
    const reviews = await db.collection('reviews')
      .find({ productId: new ObjectId(id), approved: true })
      .sort({ createdAt: -1 })
      .toArray();
    return NextResponse.json(reviews);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { rating, text, userName, userId } = body;
    if (!rating || !text) {
      return NextResponse.json({ error: 'Rating and text are required' }, { status: 400 });
    }
    const { db } = await connectToDatabase();
    const review: Review = {
      productId: new ObjectId(id),
      userId: userId || null,
      userName: userName || 'Anonymous',
      rating,
      text,
      createdAt: new Date(),
      approved: false // Требует модерации
    };
    await db.collection('reviews').insertOne(review);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to submit review' }, { status: 500 });
  }
} 