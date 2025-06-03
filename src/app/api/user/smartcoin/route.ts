import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const { db } = await connectToDatabase();
    const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ smartCoin: user.smartCoin || 0 });
  } catch (error) {
    console.error('Error fetching smart coin:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { userId, amount } = await request.json();

    if (!userId || !amount) {
      return NextResponse.json({ error: 'User ID and amount are required' }, { status: 400 });
    }

    const { db } = await connectToDatabase();
    
    const result = await db.collection('users').updateOne(
      { _id: new ObjectId(userId) },
      { $inc: { smartCoin: amount } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const updatedUser = await db.collection('users').findOne({ _id: new ObjectId(userId) });
    return NextResponse.json({ smartCoin: updatedUser.smartCoin });
  } catch (error) {
    console.error('Error updating smart coin:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 