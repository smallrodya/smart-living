import { NextResponse } from 'next/server';
import { parse } from 'csv-parse/sync';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { message: 'File not found' },
        { status: 400 }
      );
    }

    // Check file type
    if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
      return NextResponse.json(
        { message: 'Invalid file format. CSV required' },
        { status: 400 }
      );
    }

    // Read file content
    const fileContent = await file.text();
    
    // Parse CSV
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true
    });

    // Connect to database
    const { db } = await connectToDatabase();

    // Process each record
    const results = {
      updated: 0,
      failed: 0,
      errors: [] as string[]
    };

    for (const record of records) {
      try {
        const { SKU, Stock, RegularPrice, SalePrice } = record;

        // Check required fields
        if (!SKU) {
          throw new Error('SKU is required');
        }

        // Find product by SKU in all possible locations
        const product = await db.collection('products').findOne({
          $or: [
            { 'beddingSizes.sku': SKU },
            { 'rugsMatsSizes.sku': SKU },
            { 'throwsTowelsStylePrices.sku': SKU },
            { 'curtainsSizes.sku': SKU },
            { 'footwearSizes.sku': SKU },
            { 'clothingStylePrices.sku': SKU },
            { 'outdoorPrice.sku': SKU }
          ]
        });

        if (!product) {
          throw new Error(`Product with SKU ${SKU} not found`);
        }

        // Update product data
        const updateOperations: any[] = [];

        // Function to update size arrays
        const updateSizeArrays = (arrayField: string) => {
          if (product[arrayField]) {
            const updatedArray = product[arrayField].map((item: any) => {
              if (item.sku === SKU) {
                return {
                  ...item,
                  stock: Stock ? parseInt(Stock) : item.stock,
                  regularPrice: RegularPrice ? parseFloat(RegularPrice) : item.regularPrice,
                  salePrice: SalePrice ? parseFloat(SalePrice) : item.salePrice
                };
              }
              return item;
            });
            updateOperations.push({
              updateOne: {
                filter: { _id: new ObjectId(product._id) },
                update: { $set: { [arrayField]: updatedArray } }
              }
            });
          }
        };

        // Update all possible size arrays
        updateSizeArrays('beddingSizes');
        updateSizeArrays('rugsMatsSizes');
        updateSizeArrays('throwsTowelsStylePrices');
        updateSizeArrays('curtainsSizes');
        updateSizeArrays('footwearSizes');
        updateSizeArrays('clothingStylePrices');

        // Update outdoorPrice if it's an outdoor product
        if (product.outdoorPrice && product.outdoorPrice.sku === SKU) {
          updateOperations.push({
            updateOne: {
              filter: { _id: new ObjectId(product._id) },
              update: {
                $set: {
                  'outdoorPrice.stock': Stock ? parseInt(Stock) : product.outdoorPrice.stock,
                  'outdoorPrice.regularPrice': RegularPrice ? parseFloat(RegularPrice) : product.outdoorPrice.regularPrice,
                  'outdoorPrice.salePrice': SalePrice ? parseFloat(SalePrice) : product.outdoorPrice.salePrice
                }
              }
            }
          });
        }

        // Execute all update operations
        if (updateOperations.length > 0) {
          await db.collection('products').bulkWrite(updateOperations);
          results.updated++;
        } else {
          throw new Error(`Could not find SKU ${SKU} in product`);
        }

      } catch (error: any) {
        results.failed++;
        results.errors.push(`Error processing SKU ${record.SKU}: ${error.message}`);
      }
    }

    return NextResponse.json({
      message: 'Processing completed',
      results
    });

  } catch (error: any) {
    console.error('Error processing CSV:', error);
    return NextResponse.json(
      { message: error.message || 'Error processing file' },
      { status: 500 }
    );
  }
} 