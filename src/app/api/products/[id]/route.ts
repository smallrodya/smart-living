import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

export const dynamic = 'force-dynamic';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri!);

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    if (!id) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    await client.connect();
    const database = client.db('smartliving');
    const products = database.collection('products');
    
    const product = await products.findOne({ _id: new ObjectId(id) });
    
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
} 