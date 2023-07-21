'use client';

import { Copy, Terminal } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './alert';
import { useOrigin } from '@/hooks/useOrigin';
import { toast } from './use-toast';
import { Button } from './button';
import { Icons } from './icons';
import { Badge } from './badge';

interface Props {
  title: string;
  extraDesc?: string;
  directUrl?: string;
  route?: string;
  toastMessage?: string;
  toastDesc?: string;
}

const ApiAlert = ({
  route,
  title,
  directUrl,
  extraDesc,
  toastDesc,
  toastMessage
}: Props) => {
  const origin = useOrigin();

  const onCopy = (url: string) => {
    navigator.clipboard.writeText(url);

    return toast({
      title: toastMessage ? toastMessage : 'API Route copied to clipboard.',
      description: toastDesc ? toastDesc : 'Use this as an API route.'
    });
  };

  return (
    <Alert>
      <Terminal className="h-4 w-4" />
      <AlertTitle className="flex gap-x-2 items-center">
        {title} <Badge variant="outline">{directUrl ? 'SDK' : 'API'}</Badge>
      </AlertTitle>

      <AlertDescription>{extraDesc}</AlertDescription>

      {origin ? (
        <AlertDescription className="mt-4 flex items-center justify-between">
          <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
            {directUrl ? directUrl : `${origin}${route}`}
          </code>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onCopy(directUrl ? directUrl : origin + route)}
          >
            <Copy className="h-4 w-4" />
          </Button>
        </AlertDescription>
      ) : (
        <AlertDescription className="mt-4 flex items-center justify-between">
          <Icons.spinner className="mr-2 h-5 w-5 animate-spin" />
        </AlertDescription>
      )}
    </Alert>
  );
};

export default ApiAlert;
