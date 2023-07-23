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
import { Session } from 'next-auth';
import axios from 'axios';
import { toast } from '../ui/use-toast';
import { useState } from 'react';
import { Icons } from '../ui/icons';
import { UploadDropzone } from '@/lib/uploadthing';
import { Check } from 'lucide-react';

const formSchema = z.object({
  price: z.number().min(1),
  name: z
    .string()
    .min(2, {
      message: 'Name should at least be 2 characters'
    })
    .max(60, {
      message: "Name can't exceed 60 characters"
    })
});

const ProductCreationModal = ({ session }: { session: Session }) => {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<any>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: ''
    }
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);

      if (files.length <= 0) throw Error('no files');

      const body = z.object({
        name: z.string(),
        email: z.string(),
        imageUrl: z.string(),
        price: z.number()
      });

      const payload: z.infer<typeof body> = {
        email: session.user?.email!,
        name: values.name,
        imageUrl: files[0].fileUrl,
        price: values.price
      };

      await axios.post('/api/products', payload);

      window.location.replace('/products');

      return toast({
        title: `${values.name} Product created.`,
        description: 'New product created.'
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

  return (
    <div className="flex w-screen h-[90vh] justify-center items-center">
      <Card className="w-[550px]">
        <CardHeader>
          <CardTitle>Create product</CardTitle>
          <CardDescription>
            Create your new product in one-click.
          </CardDescription>
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
                name="name"
                render={() => (
                  <FormItem>
                    <FormControl>
                      <div className="flex justify-start">
                        {files.length > 0 ? (
                          <span className="ml-2 flex gap-x-2">
                            <Check /> File Uploaded
                          </span>
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
                  Create
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductCreationModal;
