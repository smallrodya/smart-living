import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    // Проверяем наличие данных пользователя в куках
    const cookieStore = await cookies();
    const userCookie = await cookieStore.get('user');

    if (!userCookie) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const userData = JSON.parse(userCookie.value);
    const { db } = await connectToDatabase();

    // Получаем данные пользователя по ID из сессии
    const user = await db.collection('users').findOne(
      { _id: new ObjectId(userData.userId) },
      {
        projection: {
          password: 0, // Исключаем пароль из результата
        }
      }
    );

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

export async function POST(request: Request) {
  try {
    // Проверяем наличие данных пользователя в куках
    const cookieStore = await cookies();
    const userCookie = await cookieStore.get('user');

    if (!userCookie) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const userData = JSON.parse(userCookie.value);
    const { db } = await connectToDatabase();

    // Получаем данные из тела запроса
    const updateData = await request.json();
    console.log('Update data:', updateData);

    // Проверяем, что у нас есть userId
    if (!userData.userId) {
      console.error('No userId in userData:', userData);
      return NextResponse.json(
        { message: 'Invalid user data' },
        { status: 400 }
      );
    }

    // Обновляем данные пользователя
    const result = await db.collection('users').updateOne(
      { _id: new ObjectId(userData.userId) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      console.error('User not found for update:', userData.userId);
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    // Получаем обновленные данные пользователя
    const updatedUser = await db.collection('users').findOne(
      { _id: new ObjectId(userData.userId) },
      {
        projection: {
          password: 0, // Исключаем пароль из результата
        }
      }
    );

    if (!updatedUser) {
      console.error('User not found after update:', userData.userId);
      return NextResponse.json(
        { message: 'User not found after update' },
        { status: 404 }
      );
    }

    // Преобразуем ObjectId в строку для JSON
    const userResponse = {
      ...updatedUser,
      _id: updatedUser._id.toString()
    };

    return NextResponse.json(userResponse);
  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json(
      { message: 'Error updating user profile', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 