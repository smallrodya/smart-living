import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';
import bcrypt from 'bcryptjs';

const uri = process.env.MONGODB_URI as string;
if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }

    const client = await MongoClient.connect(uri);
    const db = client.db('smartliving');

    const user = await db.collection('users').findOne({ email });

    await client.close();

    if (!user) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Создаем сессию пользователя
    const session = {
      userId: user._id.toString(), // Преобразуем ObjectId в строку
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      smartCoins: user.smartCoins || 0,
      createdAt: user.createdAt
    };

    // TODO: Добавить JWT токен для аутентификации

    return NextResponse.json(session);
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Error during login' },
      { status: 500 }
    );
  }
} 