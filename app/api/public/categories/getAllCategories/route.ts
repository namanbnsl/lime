import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('storeId');

  if (!id) return new NextResponse('No Store Id Passed', { status: 500 });

  const data = await prisma.store.findUnique({
    select: {
      category: true
    },
    where: {
      id: id as string
    }
  });

  return NextResponse.json(
    { message: 'Success', data: data?.category },
    {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      }
    }
  );
}
