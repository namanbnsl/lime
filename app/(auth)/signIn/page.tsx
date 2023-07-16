import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import SignIn from '@/components/auth/SignIn';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const SignInPage = async () => {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    redirect('/');
  }

  return <SignIn />;
};

export default SignInPage;
