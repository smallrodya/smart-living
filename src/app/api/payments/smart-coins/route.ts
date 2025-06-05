import { NextResponse } from 'next/server';
import { getCookie } from 'cookies-next';
import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI as string;
if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

export async function POST(req: Request) {
  try {
    const { amount, userId } = await req.json();

    // Get user data from cookie
    const userCookie = getCookie('user');
    if (!userCookie) {
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    const userData = JSON.parse(userCookie as string);
    if (userData.userId !== userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    // Connect to MongoDB
    const client = await MongoClient.connect(uri);
    const db = client.db('smartliving');

    // Get user from database
    const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });
    if (!user) {
      await client.close();
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check if user has enough Smart Coins
    if (user.smartCoins < amount) {
      await client.close();
      return NextResponse.json(
        { error: 'Not enough Smart Coins' },
        { status: 400 }
      );
    }

    // Update user's Smart Coin balance
    const updatedSmartCoins = user.smartCoins - amount;
    
    // Update balance in database
    await db.collection('users').updateOne(
      { _id: new ObjectId(userId) },
      { $set: { smartCoins: updatedSmartCoins } }
    );

    // Получаем обновленные данные пользователя
    const updatedUser = await db.collection('users').findOne({ _id: new ObjectId(userId) });
    if (!updatedUser) {
      await client.close();
      return NextResponse.json({ error: 'User not found after update' }, { status: 404 });
    }

    await client.close();

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