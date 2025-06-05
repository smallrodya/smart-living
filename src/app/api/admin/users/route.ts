import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI as string;
if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

export async function GET() {
  try {
    const client = await MongoClient.connect(uri);
    const db = client.db('smartliving');

    const users = await db.collection('users')
      .find({})
      .project({
        password: 0, // Исключаем пароль из результата
      })
      .toArray();

    await client.close();

    // Преобразуем ObjectId в строки для JSON
    const formattedUsers = users.map(user => ({
      ...user,
      _id: user._id.toString()
    }));

    return NextResponse.json({ users: formattedUsers });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { message: 'Error fetching users' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { message: 'User ID is required' },
        { status: 400 }
      );
    }

    const client = await MongoClient.connect(uri);
    const db = client.db('smartliving');

    const result = await db.collection('users').deleteOne({ _id: new ObjectId(id) });

    await client.close();

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { message: 'Error deleting user' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const { smartCoins } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    if (typeof smartCoins !== 'number' || smartCoins < 0) {
      return NextResponse.json(
        { error: 'Invalid Smart Coins value' },
        { status: 400 }
      );
    }

    const client = await MongoClient.connect(uri);
    const db = client.db('smartliving');

    const result = await db.collection('users').updateOne(
      { _id: new ObjectId(id) },
      { $set: { smartCoins } }
    );

    if (result.matchedCount === 0) {
      await client.close();
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Получаем обновленные данные пользователя
    const updatedUser = await db.collection('users').findOne({ _id: new ObjectId(id) });
    if (!updatedUser) {
      await client.close();
      return NextResponse.json(
        { error: 'User not found after update' },
        { status: 404 }
      );
    }

    await client.close();

    return NextResponse.json({ 
      message: 'Smart Coins updated successfully',
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
    console.error('Error updating Smart Coins:', error);
    return NextResponse.json(
      { error: 'Failed to update Smart Coins' },
      { status: 500 }
    );
  }
} 