import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

export const dynamic = 'force-dynamic';

// Получаем значения переменных окружения
const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

// Логируем значения (без секретных данных)
console.log('Cloudinary Config:', {
  cloud_name: cloudName,
  api_key: apiKey ? '***' : undefined,
  api_secret: apiSecret ? '***' : undefined
});

// Конфигурируем Cloudinary
cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
  secure: true // Принудительно используем HTTPS
});

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

    // Проверяем конфигурацию Cloudinary
    if (!cloudName || !apiKey || !apiSecret) {
      console.error('Cloudinary configuration missing:', {
        cloud_name: !!cloudName,
        api_key: !!apiKey,
        api_secret: !!apiSecret,
        env_vars: Object.keys(process.env).filter(key => key.includes('CLOUDINARY'))
      });
      return NextResponse.json(
        { error: 'Cloudinary configuration is missing' },
        { status: 500 }
      );
    }

    // Конвертируем File в Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Создаем base64 строку из буфера
    const base64String = buffer.toString('base64');
    const dataURI = `data:${file.type};base64,${base64String}`;

    // Загружаем файл в Cloudinary используя upload
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: 'smartliving',
      resource_type: 'auto',
      use_filename: true,
      unique_filename: true,
    });

    if (!result || !result.secure_url) {
      throw new Error('Failed to upload file to Cloudinary');
    }

    return NextResponse.json({
      url: result.secure_url,
      public_id: result.public_id
    });
  } catch (error: any) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: `Error uploading file: ${error?.message || 'Unknown error'}` },
      { status: 500 }
    );
  }
} 