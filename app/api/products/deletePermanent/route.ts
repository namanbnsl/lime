import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function POST(req: Request) {
  const {
    productId
  }: {
    productId: string;
  } = await req.json();

  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const product = await prisma.product.delete({
    where: {
      id: productId
    }
  });

  return NextResponse.json({ product });
}
