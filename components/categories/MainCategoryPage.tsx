'use client';

import { Edit, MoreHorizontal, Plus, PlusCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Heading } from '../ui/heading';
import { Separator } from '../ui/separator';
import Link from 'next/link';
import { DataTable } from './data-table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '../ui/dropdown-menu';
import { ColumnDef } from '@tanstack/react-table';
import ApiAlert from '../ui/api-alert';
import { Category } from '@prisma/client';
import { Badge } from '../ui/badge';

interface Props {
  data: { name: string; id: string; storeId: string }[];
  storeId: string;
}

const columns: ColumnDef<Category>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      return <Badge>{row.original.name}</Badge>;
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
            <Link href={`/categories/edit/${row.original.id}`} className="flex">
              <DropdownMenuItem className="cursor-pointer flex">
                Edit {row.original.name} Category
                <Edit className="w-4 h-4 ml-2" />
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
  }
];

const MainCategoryPage = ({ data, storeId }: Props) => {
  console.log(data);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <Heading
          title="Categories"
          description="View all your categories and manage them."
        />

        <Link href={'/categories/new'}>
          <Button>
            New <PlusCircle className="w-4 h-4 ml-1" />
          </Button>
        </Link>
      </div>

      <Separator className="my-4" />

      <div className="w-[45%]">
        <DataTable columns={columns} data={data} />
      </div>

      <div className="w-[60%] flex flex-col gap-y-2">
        <ApiAlert
          title="Your Store ID."
          directUrl={storeId}
          extraDesc="Keep this safe!. If anyone gets access to it they can take data from your store."
          toastMessage="Copied storeId."
          toastDesc="Paste this in our SDK."
        />
        <ApiAlert
          title="Get All Categories"
          route={`/api/public/categories/getAllCategories?storeId=${storeId}`}
        />
      </div>
    </div>
  );
};

export default MainCategoryPage;
