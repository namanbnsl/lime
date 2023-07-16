import Navbar from '@/components/navbar/Navbar';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/signIn');
  }

  return (
    <>
      {session?.user && <Navbar />}
      {children}
    </>
  );
}
