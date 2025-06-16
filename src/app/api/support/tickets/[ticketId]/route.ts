import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

interface Ticket {
  _id: ObjectId;
  userId: string;
  category: string;
  status: 'open' | 'in-progress' | 'closed';
  messages: Array<{
    _id: ObjectId;
    userId: string;
    text: string;
    createdAt: Date;
    isAdmin: boolean;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

export async function PATCH(
  request: Request,
  { params }: { params: { ticketId: string } }
) {
  try {
    const { status } = await request.json();
    if (!status || !['open', 'in-progress', 'closed'].includes(status)) {
      return new NextResponse('Invalid status', { status: 400 });
    }

    const { db } = await connectToDatabase();
    const ticketId = new ObjectId(params.ticketId);

    const result = await db.collection('tickets').updateOne(
      { _id: ticketId },
      { 
        $set: { 
          status,
          updatedAt: new Date()
        } 
      }
    );

    if (result.matchedCount === 0) {
      return new NextResponse('Ticket not found', { status: 404 });
    }

    const updatedTicket = await db.collection('tickets').findOne({ _id: ticketId });
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
    console.error('Error updating ticket:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { ticketId: string } }
) {
  try {
    const { db } = await connectToDatabase();
    const ticketId = new ObjectId(params.ticketId);

    const result = await db.collection('tickets').deleteOne({ _id: ticketId });

    if (result.deletedCount === 0) {
      return new NextResponse('Ticket not found', { status: 404 });
    }

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting ticket:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 