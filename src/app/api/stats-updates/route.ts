import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const maxDuration = 30; // Устанавливаем максимальную длительность в 30 секунд

export async function GET() {
  try {
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        let isControllerClosed = false;

        // Отправляем начальное сообщение
        controller.enqueue(encoder.encode('data: {"type":"connected"}\n\n'));

        // Устанавливаем интервал для отправки обновлений
        const interval = setInterval(() => {
          if (!isControllerClosed) {
            try {
              controller.enqueue(encoder.encode('data: {"type":"ping"}\n\n'));
            } catch (error) {
              isControllerClosed = true;
              clearInterval(interval);
            }
          }
        }, 15000);

        // Обработчик закрытия соединения
        return () => {
          isControllerClosed = true;
          clearInterval(interval);
          try {
            controller.close();
          } catch (error) {
            console.error('Error closing controller:', error);
          }
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