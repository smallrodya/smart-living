import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'data', 'promocodes.json');

function readPromocodes() {
  try {
    const data = fs.readFileSync(DATA_PATH, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function writePromocodes(promocodes: any[]) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(promocodes, null, 2), 'utf-8');
}

export async function GET() {
  const promocodes = readPromocodes();
  return NextResponse.json(promocodes);
}

export async function POST(req: NextRequest) {
  const { code, discount } = await req.json();
  if (!code || typeof discount !== 'number') {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
  }
  const promocodes = readPromocodes();
  if (promocodes.find((p: any) => p.code === code)) {
    return NextResponse.json({ error: 'Code already exists' }, { status: 400 });
  }
  promocodes.push({ code, discount });
  writePromocodes(promocodes);
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  const { code } = await req.json();
  if (!code) {
    return NextResponse.json({ error: 'No code' }, { status: 400 });
  }
  let promocodes = readPromocodes();
  promocodes = promocodes.filter((p: any) => p.code !== code);
  writePromocodes(promocodes);
  return NextResponse.json({ success: true });
} 