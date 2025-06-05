import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    const { db } = await connectToDatabase();
    const query = email ? { 'customerDetails.email': email } : {};
    
    const orders = await db.collection('orders')
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const orderData = await request.json();
    const { db } = await connectToDatabase();

    // Создаем заказ
    const result = await db.collection('orders').insertOne({
      ...orderData,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    // Начисляем Smart Coin (5% от суммы subtotal)
    const subtotal = orderData.items.reduce((sum: number, item: any) => {
      const itemPrice = item.clearanceDiscount 
        ? item.price * (1 - item.clearanceDiscount / 100) 
        : item.price;
      return sum + (itemPrice * item.quantity);
    }, 0);
    
    const smartCoinAmount = subtotal * 0.05;
    console.log('Subtotal:', subtotal);
    console.log('Smart Coin amount:', smartCoinAmount);
    
    // Получаем ID пользователя из email
    const user = await db.collection('users').findOne({ email: orderData.customerDetails.email });
    console.log('Found user:', user);
    
    if (user) {
      const updateResult = await db.collection('users').updateOne(
        { _id: user._id },
        { $inc: { smartCoins: smartCoinAmount } }
      );
      console.log('Update result:', updateResult);
      
      // Получаем обновленные данные пользователя
      const updatedUser = await db.collection('users').findOne({ _id: user._id });
      if (updatedUser) {
        // Обновляем куки с новым балансом
        const userData = {
          userId: updatedUser._id.toString(),
          email: updatedUser.email,
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName,
          smartCoins: updatedUser.smartCoins,
          createdAt: updatedUser.createdAt
        };
        return NextResponse.json({ 
          success: true, 
          orderId: result.insertedId,
          smartCoinEarned: smartCoinAmount,
          userData
        });
      }
    } else {
      console.log('User not found for email:', orderData.customerDetails.email);
    }
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 