import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(req: Request) {
  const { email, name } = await req.json();

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

  if (user?.store) {
    return new NextResponse('Store already exists', { status: 500 });
  }

  // const store = await db.insert(storeDbModel).values({
  //   id: (Date.now() * Math.random()).toString(),
  //   name: name,
  //   userId: user.id
  // });

  const store = await prisma.store.create({
    data: {
      name,
      userId: user?.id as string
    }
  });

  return NextResponse.json({ store });
}
