import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { Product } from '@/models/Product';
import { ObjectId } from 'mongodb';

export async function GET(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("smartliving");
    const { searchParams } = new URL(request.url);

    // Получаем параметры фильтрации
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const isBestSeller = searchParams.get('isBestSeller');
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    // Создаем базовый фильтр
    let filter: any = {};

    // Добавляем поиск по названию и описанию
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { 'description.main': { $regex: search, $options: 'i' } }
      ];
    }

    // Добавляем фильтр по категории
    if (category) {
      filter.category = category;
    }

    // Добавляем фильтр по цене
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }

    // Добавляем фильтр по бестселлерам
    if (isBestSeller) {
      filter.isBestSeller = isBestSeller === 'true';
    }

    // Создаем объект сортировки
    const sort: any = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Получаем общее количество товаров для пагинации
    const total = await db.collection("products").countDocuments(filter);

    // Получаем товары с учетом фильтров, сортировки и пагинации
    const products = await db.collection("products")
      .find(filter)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    // Получаем уникальные категории для фильтров
    const categories = await db.collection("products")
      .distinct("category");

    // Получаем минимальную и максимальную цены для фильтров
    const priceRange = await db.collection("products")
      .aggregate([
        {
          $group: {
            _id: null,
            minPrice: { $min: "$price" },
            maxPrice: { $max: "$price" }
          }
        }
      ])
      .toArray();

    return NextResponse.json({
      products,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      },
      filters: {
        categories,
        priceRange: priceRange[0] || { minPrice: 0, maxPrice: 0 }
      }
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("smartliving");
    const product = await request.json();
    
    const result = await db.collection("products").insertOne({
      ...product,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("smartliving");
    const { _id, ...updateData } = await request.json();

    if (!_id) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    const result = await db.collection("products").updateOne(
      { _id: new ObjectId(_id) },
      { 
        $set: {
          ...updateData,
          updatedAt: new Date()
        }
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Product updated successfully', result });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("smartliving");
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    const result = await db.collection("products").deleteOne({
      _id: new ObjectId(id)
    });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
} 