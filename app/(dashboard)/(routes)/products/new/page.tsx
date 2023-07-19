import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import ProductCreationModal from '@/components/products/ProductCreationModal';
import { Session, getServerSession } from 'next-auth';

const NewProduct = async () => {
  const session = await getServerSession(authOptions);

  return <ProductCreationModal session={session as Session} />;
};

export default NewProduct;
