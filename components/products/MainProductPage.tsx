'use client';

import { ArrowUpDown, Edit, MoreHorizontal, PlusCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Heading } from '../ui/heading';
import { Separator } from '../ui/separator';
import Link from 'next/link';
import { DataTable } from '../ui/data-table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '../ui/dropdown-menu';
import { Product } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';

interface Props {
  data: Product[];
}

const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'imageUrl',
    header: 'Image',
    cell: ({ row }) => {
      return (
        <Link href={row.original.imageUrl} target="_blank">
          <Button variant={'link'} className="dark:text-blue-200 text-blue-400">
            View Image
          </Button>
        </Link>
      );
    }
  },
  {
    accessorKey: 'price',
    header: ({ column }) => {
      return (
        <div className="flex justify-end items-center">
          <Button
            variant={'link'}
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Price
            <ArrowUpDown className="h-4 w-4 ml-2" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const price = parseFloat(row.getValue('price'));
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(price);

      return <div className="text-right font-medium">{formatted}</div>;
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem className="cursor-pointer flex">
              Edit {row.original.name}
              <Edit className="w-4 h-4 ml-2" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
  }
];

const MainProductPage = ({ data }: Props) => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <Heading
          title="Products"
          description="View all your products and manage them."
        />

        <Link href={'/products/new'}>
          <Button>
            New <PlusCircle className="w-4 h-4 ml-1" />
          </Button>
        </Link>
      </div>

      <Separator className="my-4" />

      <div className="w-[45%]">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default MainProductPage;
