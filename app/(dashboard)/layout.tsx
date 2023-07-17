import Navbar from '@/components/navbar/Navbar';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import StoreCreationModal from '@/components/stores/StoreCreationModal';

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/signIn');
  }

  const user = await prisma.user.findUnique({
    select: { store: true },
    where: {
      email: session.user.email as string
    }
  });

  return (
    <>
      {session?.user && user?.store && <Navbar />}
      {!user?.store && <StoreCreationModal session={session} />}

      {session?.user && user?.store && <>{children}</>}
    </>
  );
}
