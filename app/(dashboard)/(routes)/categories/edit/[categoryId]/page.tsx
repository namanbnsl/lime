import EditCategoryPage from '@/components/categories/EditCategoryPage';
import { prisma } from '@/lib/db';

const EditCategory = async ({ params }: { params: { categoryId: string } }) => {
  const category = await prisma.category.findUnique({
    where: {
      id: params.categoryId
    }
  });

  return (
    <EditCategoryPage
      category={{ id: category?.id as string, name: category?.name as string }}
    />
  );
};

export default EditCategory;
