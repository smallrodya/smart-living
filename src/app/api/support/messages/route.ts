import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

interface Message {
  _id: ObjectId;
  userId: string;
  text: string;
  createdAt: Date;
  isAdmin: boolean;
}

export async function POST(request: Request) {
  try {
    const { ticketId, text, userEmail } = await request.json();
    const isAdmin = request.headers.get('x-is-admin') === 'true';

    if (!ticketId || !text) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    const { db } = await connectToDatabase();
    const ticketObjectId = new ObjectId(ticketId);

    // Создаем новое сообщение
    const message: Message = {
      _id: new ObjectId(),
      userId: userEmail,
      text,
      createdAt: new Date(),
      isAdmin
    };

    // Добавляем сообщение в тикет
    const result = await db.collection('tickets').updateOne(
      { _id: ticketObjectId },
      { 
        $push: { messages: message },
        $set: { updatedAt: new Date() }
      }
    );

    if (result.matchedCount === 0) {
      return new NextResponse('Ticket not found', { status: 404 });
    }

    // Получаем обновленный тикет
    const updatedTicket = await db.collection('tickets').findOne({ _id: ticketObjectId });
    if (!updatedTicket) {
      return new NextResponse('Failed to fetch updated ticket', { status: 500 });
    }

    // Сериализуем ObjectId в строки
    const serializedTicket = {
      ...updatedTicket,
      _id: updatedTicket._id.toString(),
      messages: updatedTicket.messages.map((msg: any) => ({
        ...msg,
        _id: msg._id.toString()
      }))
    };

    return NextResponse.json(serializedTicket);
  } catch (error) {
    console.error('Error adding message:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 