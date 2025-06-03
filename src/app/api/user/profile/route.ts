import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';
import { cookies } from 'next/headers';

const uri = process.env.MONGODB_URI as string;
if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

export async function GET(request: Request) {
  try {
    // Проверяем наличие данных пользователя в куках
    const cookieStore = cookies();
    const userCookie = cookieStore.get('user');

    if (!userCookie) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const userData = JSON.parse(userCookie.value);
    const client = await MongoClient.connect(uri);
    const db = client.db('smartliving');

    // Получаем данные пользователя по ID из сессии
    const user = await db.collection('users').findOne(
      { _id: new ObjectId(userData.userId) },
      {
        projection: {
          password: 0, // Исключаем пароль из результата
        }
      }
    );

    await client.close();

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    // Преобразуем ObjectId в строку для JSON
    const userResponse = {
      ...user,
      _id: user._id.toString()
    };

    return NextResponse.json(userResponse);
  } catch (error) {
    console.error('Profile error:', error);
    return NextResponse.json(
      { message: 'Error fetching user profile' },
      { status: 500 }
    );
  }
} 