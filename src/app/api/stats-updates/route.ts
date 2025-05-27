import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    start(controller) {
      // Отправляем начальное сообщение
      controller.enqueue(encoder.encode('data: {"type":"connected"}\n\n'));
    },
  });

  return new NextResponse(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
} 