import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import MainProductPage from '@/components/products/MainProductPage';
import { prisma } from '@/lib/db';
import { getServerSession } from 'next-auth';

const ProductsPage = async () => {
  const session = await getServerSession(authOptions);

  const data = await prisma.user.findUnique({
    where: {
      email: session?.user?.email as string
    },
    select: {
      store: {
        select: {
          products: true
        }
      }
    }
  });

  return <MainProductPage data={data?.store?.products ?? []} />;
};

export default ProductsPage;
