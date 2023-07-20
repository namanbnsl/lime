import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import EditProductModal from '@/components/products/EditProductModal';
import { prisma } from '@/lib/db';
import { Product } from '@prisma/client';
import { Session, getServerSession } from 'next-auth';

const EditProduct = async ({ params }: { params: { productId: string } }) => {
  const session = await getServerSession(authOptions);
  const product = await prisma.product.findUnique({
    where: {
      id: params.productId
    }
  });

  return (
    <EditProductModal
      session={session as Session}
      product={product as Product}
    />
  );
};

export default EditProduct;
