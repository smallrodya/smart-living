import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const maxDuration = 30; // Устанавливаем максимальную длительность в 30 секунд

export async function GET() {
  try {
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        // Отправляем начальное сообщение
        controller.enqueue(encoder.encode('data: {"type":"connected"}\n\n'));

        // Устанавливаем интервал для отправки обновлений
        const interval = setInterval(() => {
          controller.enqueue(encoder.encode('data: {"type":"ping"}\n\n'));
        }, 15000); // Отправляем пинг каждые 15 секунд

        // Очищаем интервал при закрытии соединения
        return () => {
          clearInterval(interval);
        };
      },
    });

    return new NextResponse(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Error in stats-updates:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 