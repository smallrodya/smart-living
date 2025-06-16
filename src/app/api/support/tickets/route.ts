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

interface Ticket {
  _id: ObjectId;
  userEmail: string;
  firstName: string;
  lastName: string;
  subject: string;
  status: 'open' | 'in-progress' | 'closed';
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const ticketsCollection = db.collection<Ticket>('tickets');
    const tickets = await ticketsCollection.find({}).toArray();
    
    // Преобразуем ObjectId в строки для JSON
    const serializedTickets = tickets.map(ticket => ({
      ...ticket,
      _id: ticket._id.toString(),
      messages: ticket.messages.map(msg => ({
        ...msg,
        _id: msg._id.toString()
      }))
    }));

    return NextResponse.json(serializedTickets);
  } catch (error) {
    console.error('Error fetching tickets:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tickets' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { userEmail, firstName, lastName, subject, message } = await request.json();

    if (!userEmail || !firstName || !lastName || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();
    const ticketsCollection = db.collection<Ticket>('tickets');

    const newTicket: Ticket = {
      _id: new ObjectId(),
      userEmail,
      firstName,
      lastName,
      subject,
      status: 'open',
      messages: [{
        _id: new ObjectId(),
        userId: userEmail,
        text: message,
        createdAt: new Date(),
        isAdmin: false
      }],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await ticketsCollection.insertOne(newTicket);

    if (!result.acknowledged) {
      return NextResponse.json(
        { error: 'Failed to create ticket' },
        { status: 500 }
      );
    }

    // Преобразуем ObjectId в строки для JSON
    const serializedTicket = {
      ...newTicket,
      _id: newTicket._id.toString(),
      messages: newTicket.messages.map(msg => ({
        ...msg,
        _id: msg._id.toString()
      }))
    };

    return NextResponse.json(serializedTicket);
  } catch (error) {
    console.error('Error creating ticket:', error);
    return NextResponse.json(
      { error: 'Failed to create ticket' },
      { status: 500 }
    );
  }
} 