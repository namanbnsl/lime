'use client';

import { Delete } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '../ui/alert-dialog';
import { useState } from 'react';
import { toast } from '../ui/use-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const DeleteProduct = ({
  name,
  productId
}: {
  name: string;
  productId: string;
}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          disabled={loading}
          className="cursor-pointer flex text-red-400 px-2 py-2 mb-1 items-center text-sm hover:bg-muted rounded-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50"
          onClick={() => {}}
        >
          Delete {name}
          <Delete className="w-4 h-4 ml-2" />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            product and remove data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              try {
                setLoading(true);

                await axios.post('/api/products/deletePermanent', {
                  productId
                });

                router.refresh();

                return toast({
                  title: `${name} deleted.`,
                  description: 'Product deleted.'
                });
              } catch (err) {
                return toast({
                  title: 'Something went wrong.',
                  variant: 'destructive',
                  description: 'Please try again.'
                });
              } finally {
                setLoading(false);
              }
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteProduct;
