import { NextResponse } from 'next/server';
import { getCookie } from 'cookies-next';
import { MongoClient, ObjectId } from 'mongodb';
import { connectToDatabase } from '@/lib/mongodb';

export async function POST(req: Request) {
  try {
    const { amount, userId } = await req.json();

    if (!amount || !userId) {
      return NextResponse.json(
        { error: 'Amount and userId are required' },
        { status: 400 }
      );
    }

    // Get user data from cookie
    const userCookie = getCookie('user', { req });
    if (!userCookie) {
      return NextResponse.json(
        { error: 'User not authenticated' },
        { status: 401 }
      );
    }

    let userData;
    try {
      userData = JSON.parse(userCookie as string);
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid user data' },
        { status: 401 }
      );
    }

    if (userData.userId !== userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    // Connect to MongoDB
    const { db } = await connectToDatabase();

    // Get user from database
    const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Check if user has enough Smart Coins
    if (user.smartCoins < amount) {
      return NextResponse.json(
        { error: 'Not enough Smart Coins' },
        { status: 400 }
      );
    }

    // Update user's Smart Coin balance
    const updatedSmartCoins = user.smartCoins - amount;
    
    // Update balance in database
    const updateResult = await db.collection('users').updateOne(
      { _id: new ObjectId(userId) },
      { $set: { smartCoins: updatedSmartCoins } }
    );

    if (updateResult.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Failed to update Smart Coins balance' },
        { status: 500 }
      );
    }

    // Get updated user data
    const updatedUser = await db.collection('users').findOne({ _id: new ObjectId(userId) });
    if (!updatedUser) {
      return NextResponse.json(
        { error: 'Failed to get updated user data' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      newBalance: updatedSmartCoins,
      userData: {
        userId: updatedUser._id.toString(),
        email: updatedUser.email,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        smartCoins: updatedUser.smartCoins,
        createdAt: updatedUser.createdAt
      }
    });
  } catch (error) {
    console.error('Smart Coin payment error:', error);
    return NextResponse.json(
      { error: 'Failed to process Smart Coin payment' },
      { status: 500 }
    );
  }
} 