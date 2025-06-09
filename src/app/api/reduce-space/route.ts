import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import ReduceSpace from '@/models/ReduceSpace';

export async function GET() {
  try {
    await connectDB();
    let data = await ReduceSpace.findOne();
    
    if (!data) {
      // Если данных нет, создаем документ с дефолтными значениями
      data = await ReduceSpace.create({
        sectionTitle: 'Reduce Space, Increase Comfort',
        sectionDescription: 'Transform your outdoor space with our premium collection of gravity chairs. Experience ultimate relaxation with our innovative designs that combine style, comfort, and functionality.',
        products: []
      });
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in GET /api/reduce-space:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const updates = await request.json();
    
    let data = await ReduceSpace.findOne();
    if (!data) {
      data = await ReduceSpace.create({
        sectionTitle: updates.sectionTitle || 'Reduce Space, Increase Comfort',
        sectionDescription: updates.sectionDescription || 'Transform your outdoor space with our premium collection of gravity chairs.',
        products: updates.products || []
      });
    } else {
      // Обновляем только те поля, которые были переданы
      if (updates.sectionTitle !== undefined) {
        data.sectionTitle = updates.sectionTitle;
      }
      if (updates.sectionDescription !== undefined) {
        data.sectionDescription = updates.sectionDescription;
      }
      if (updates.products !== undefined) {
        data.products = updates.products;
      }
      
      await data.save();
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in POST /api/reduce-space:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 