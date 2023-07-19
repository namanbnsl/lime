'use client';

import { Loader } from '@/components/ui/loader';

const Loading = () => {
  return (
    <div className="flex h-[90vh] w-screen items-center justify-center">
      <Loader />
    </div>
  );
};

export default Loading;
