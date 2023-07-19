import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(req: Request) {
  const {
    email,
    name,
    imageUrl,
    price
  }: { price: string; email: string; name: string; imageUrl: string } =
    await req.json();

  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const user = await prisma.user.findUnique({
    select: { store: true, id: true },
    where: {
      email
    }
  });

  if (!user?.store) {
    return new NextResponse('No store exists.', { status: 500 });
  }

  const product = await prisma.product.create({
    data: {
      name,
      imageUrl,
      price: price.toString(),
      storeId: user.store.id
    }
  });

  return NextResponse.json({ product });
}
