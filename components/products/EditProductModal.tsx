'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form';
import { Input } from '../ui/input';
import axios from 'axios';
import { toast } from '../ui/use-toast';
import { useState } from 'react';
import { Icons } from '../ui/icons';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Category, Product } from '@prisma/client';
import { UploadDropzone } from '@/lib/uploadthing';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { cn } from '@/lib/utils';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem
} from '../ui/command';

const formSchema = z.object({
  price: z.number().min(1),
  category: z.string({
    required_error: 'Please select a category.'
  }),
  name: z
    .string()
    .min(2, {
      message: 'Name should at least be 2 characters'
    })
    .max(60, {
      message: "Name can't exceed 60 characters"
    })
});

const EditProductModal = ({
  product,
  allCategories
}: {
  allCategories: {
    name: string;
    id: string;
    storeId: string;
  }[];
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    storeId: string;
    category: Category;
  };
}) => {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<any>([{ fileUrl: product.imageUrl }]);
  const [newFiles, setNewFiles] = useState<any>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: product.name,
      category: product.category.name,
      price: parseFloat(product.price)
    }
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);

      if (files.length <= 0) throw Error('no files');

      const body = z.object({
        productId: z.string(),
        name: z.string(),
        imageUrl: z.string(),
        price: z.number(),
        category: z.string()
      });

      let payload: z.infer<typeof body>;

      if (newFiles.length > 0) {
        payload = {
          productId: product.id,
          name: values.name,
          imageUrl: newFiles[0].fileUrl,
          price: values.price,
          category: values.category
        };
      } else {
        payload = {
          productId: product.id,
          name: values.name,
          imageUrl: files[0].fileUrl,
          price: values.price,
          category: values.category
        };
      }

      await axios.post('/api/products/edit', payload);

      window.location.replace('/products');

      return toast({
        title: `${values.name} Product upadted.`,
        description: 'Product updated.'
      });
    } catch (err) {
      if ((err as Error).message === 'no files') {
        return toast({
          title: "Image wasn't uploaded.",
          variant: 'destructive',
          description: 'Please try again.'
        });
      } else {
        return toast({
          title: 'Something went wrong.',
          variant: 'destructive',
          description: 'Please try again.'
        });
      }
    } finally {
      setLoading(false);
    }
  }

  const categories = allCategories.map((category) => {
    return {
      value: category.id,
      label: category.name
    };
  });

  return (
    <div className="flex w-screen h-[90vh] justify-center items-center">
      <Card className="w-[550px]">
        <CardHeader>
          <CardTitle>Edit product</CardTitle>
          <CardDescription>Edit your new product in one-click.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="off"
                        placeholder="Nike Shoe"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This is your product's name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="19"
                        {...field}
                        onChange={(event) =>
                          field.onChange(+event.target.value)
                        }
                      />
                    </FormControl>
                    <FormDescription>
                      This is your product's price.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="mb-2">Category</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              'w-[200px] justify-between',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value
                              ? categories.find(
                                  (language) => language.value === field.value
                                )?.label
                              : 'Select category'}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="Search framework..." />
                          <CommandEmpty>No category found.</CommandEmpty>
                          <CommandGroup>
                            {categories.map((category) => (
                              <CommandItem
                                value={category.value}
                                key={category.value}
                                onSelect={(value) => {
                                  form.setValue('category', value);
                                }}
                              >
                                <Check
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    category.value === field.value
                                      ? 'opacity-100'
                                      : 'opacity-0'
                                  )}
                                />
                                {category.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      This is the category that will be used for the product.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={() => (
                  <FormItem>
                    <FormControl>
                      <div className="flex justify-start">
                        {newFiles.length > 0 ? (
                          <div>
                            <span className="ml-2 flex gap-x-2">
                              <Check /> Image Uploaded.
                            </span>
                          </div>
                        ) : (
                          <UploadDropzone
                            endpoint="imageUploader"
                            onClientUploadComplete={(res) => {
                              setLoading(false);
                              setFiles(res);
                            }}
                            onUploadProgress={() => {
                              setLoading(true);
                            }}
                            onUploadError={(error: Error) => {
                              return toast({
                                title: "File upload didn't work",
                                description: 'Please try again or contact us',
                                variant: 'destructive'
                              });
                            }}
                          />
                        )}
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex justify-end">
                <Button disabled={loading || files.length <= 0} type="submit">
                  {loading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Update
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditProductModal;
