import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import MainCategoryPage from '@/components/categories/MainCategoryPage';
import { prisma } from '@/lib/db';
import { getServerSession } from 'next-auth';

const CategoriesPage = async () => {
  const session = await getServerSession(authOptions);

  const storeIdData = await prisma.user.findUnique({
    where: {
      email: session?.user?.email as string
    },
    select: {
      store: {
        select: {
          id: true,
          category: true
        }
      }
    }
  });

  return (
    <MainCategoryPage
      storeId={storeIdData?.store?.id as string}
      data={
        storeIdData?.store?.category as unknown as {
          name: string;
          id: string;
          storeId: string;
        }[]
      }
    />
  );
};

export default CategoriesPage;
