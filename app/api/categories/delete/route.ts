import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function POST(req: Request) {
  const { categoryId, productId }: { categoryId: string; productId: string } =
    await req.json();

  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const category = await prisma.product.update({
    where: {
      id: productId
    },
    data: {
      category: {
        disconnect: {
          id: categoryId
        }
      }
    }
  });

  return NextResponse.json({ category });
}
