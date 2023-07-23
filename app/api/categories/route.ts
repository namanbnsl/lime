import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(req: Request) {
  const { email, name }: { email: string; name: string } = await req.json();

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

  const category = await prisma.category.create({
    data: {
      name,
      storeId: user.store.id
    }
  });

  return NextResponse.json({ category });
}
