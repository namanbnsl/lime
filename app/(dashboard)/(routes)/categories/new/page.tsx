import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import CreateCategoryPage from '@/components/categories/CreateCategoryPage';
import { Session, getServerSession } from 'next-auth';

const NewProduct = async () => {
  const session = await getServerSession(authOptions);

  return <CreateCategoryPage session={session as Session} />;
};

export default NewProduct;
