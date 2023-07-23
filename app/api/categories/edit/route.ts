import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function POST(req: Request) {
  const { id, name }: { id: string; name: string } = await req.json();

  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const category = await prisma.category.update({
    where: {
      id
    },
    data: {
      name
    }
  });

  return NextResponse.json({ category });
}
