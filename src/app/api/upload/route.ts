import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Конвертируем File в Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Загружаем файл в Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: 'smartliving',
          resource_type: 'auto',
        },
        (error, result) => {
          if (error) reject(error);
          resolve(result);
        }
      ).end(buffer);
    });

    return NextResponse.json({
      url: (result as any).secure_url,
      public_id: (result as any).public_id
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Error uploading file' },
      { status: 500 }
    );
  }
} 