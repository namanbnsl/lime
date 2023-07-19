import { getServerSession } from 'next-auth';
import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { authOptions } from '../auth/[...nextauth]/route';
import { env } from 'process';

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: '4MB' } })
    // Set permissions and file types for this FileRoute
    .middleware(async () => {
      // This code runs on your server before upload
      const user = await getServerSession(authOptions);

      // If you throw, the user will not be able to upload
      if (!user?.user) throw new Error('Unauthorized');

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { email: user.user.email };
    })
    .onUploadComplete(async ({ file }) => {
      if (env.NODE_ENV === 'development') {
        console.log(file.url);
      }
    })
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
