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
          id: true,
          products: true
        }
      }
    }
  });

  const products =
    data?.store?.products.map((item) => ({
      id: item.id,
      name: item.name,
      price: parseFloat(item.price),
      imageUrl: item.imageUrl
    })) ?? [];

  return (
    <MainProductPage data={products} storeId={data?.store?.id as string} />
  );
};

export default ProductsPage;
