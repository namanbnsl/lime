import EditProductModal from '@/components/products/EditProductModal';
import { prisma } from '@/lib/db';
import { Category } from '@prisma/client';

const EditProduct = async ({ params }: { params: { productId: string } }) => {
  const product = await prisma.product.findUnique({
    select: {
      id: true,
      name: true,
      imageUrl: true,
      price: true,
      storeId: true,
      category: true
    },
    where: {
      id: params.productId
    }
  });

  const data = await prisma.store.findUnique({
    select: {
      category: true
    },
    where: {
      id: product?.storeId
    }
  });

  return (
    <EditProductModal
      allCategories={
        data?.category as unknown as {
          id: string;
          name: string;
          storeId: string;
        }[]
      }
      product={
        product as unknown as {
          id: string;
          name: string;
          imageUrl: string;
          price: string;
          storeId: string;
          category: Category;
        }
      }
    />
  );
};

export default EditProduct;
