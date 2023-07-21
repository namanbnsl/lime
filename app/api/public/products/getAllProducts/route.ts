import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('storeId');

  if (!id) return new NextResponse('No Store Id Passed', { status: 500 });

  const data = await prisma.store.findUnique({
    select: { products: true },
    where: {
      id: id as string
    }
  });

  const products =
    data?.products.map((item) => ({
      id: item.id,
      name: item.name,
      price: parseFloat(item.price),
      imageUrl: item.imageUrl
    })) ?? [];

  return NextResponse.json(
    { message: 'Success', data: products },
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
