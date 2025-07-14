import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Review id required' }, { status: 400 });
    const { db } = await connectToDatabase();
    await db.collection('reviews').updateOne({ _id: new ObjectId(id) }, { $set: { approved: true } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to approve review' }, { status: 500 });
  }
} 