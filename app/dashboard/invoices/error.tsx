// error.tsx define a UI boundary for a route segment.
// serves as a catch-all for unexpected errors and allows you to display a fallback UI to your users.
// needs to be a Client Component.
'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset, // a function to reset the error boundary, try to re-render the route segment.
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="flex h-full flex-col items-center justify-center">
      <h2 className="text-center">Something went wrong!</h2>
      <button
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
        onClick={
          // Attempt to recover by trying to re-render the invoices route
          () => reset()
        }
      >
        Try again
      </button>
    </main>
  );
}