import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';
import bcrypt from 'bcryptjs';

const uri = process.env.MONGODB_URI as string;
if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, password } = await request.json();

    // Подключение к MongoDB
    const client = await MongoClient.connect(uri);
    const db = client.db('smartliving');

    // Проверка существования пользователя
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      await client.close();
      return NextResponse.json(
        { message: 'User with this email already exists' },
        { status: 400 }
      );
    }

    // Хеширование пароля
    const hashedPassword = await bcrypt.hash(password, 10);

    // Создание нового пользователя
    const newUser = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      smartCoins: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Сохранение пользователя в базу данных
    const result = await db.collection('users').insertOne(newUser);

    await client.close();

    // Возвращаем данные пользователя без пароля
    const userResponse = {
      id: result.insertedId.toString(),
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      smartCoins: newUser.smartCoins,
      createdAt: newUser.createdAt
    };

    return NextResponse.json(
      { message: 'User registered successfully', user: userResponse },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'Error registering user' },
      { status: 500 }
    );
  }
} 