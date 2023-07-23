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

const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Name should at least be 2 characters'
    })
    .max(60, {
      message: "Name can't exceed 60 characters"
    })
});

const EditCategoryPage = ({
  category
}: {
  category: { id: string; name: string };
}) => {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: category.name
    }
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);

      const body = z.object({
        id: z.string(),
        name: z.string()
      });

      const payload: z.infer<typeof body> = {
        id: category.id,
        name: values.name
      };

      await axios.post('/api/categories/edit', payload);

      window.location.replace('/categories');

      return toast({
        title: `${values.name} Category upadted.`,
        description: 'Category updated.'
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
  }

  return (
    <div className="flex w-screen h-[90vh] justify-center items-center">
      <Card className="w-[550px]">
        <CardHeader>
          <CardTitle>Edit category</CardTitle>
          <CardDescription>Edit your category in one-click.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category Name</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="off"
                        placeholder="Discounted"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This is your category's name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end">
                <Button disabled={loading} type="submit">
                  {loading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Update Category
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditCategoryPage;
