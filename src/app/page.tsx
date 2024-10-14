import { Suspense } from 'react';

import Reports from '@/components/reports';
import { TableSkeleton } from '@/components/skeletons';

export default async function Home() {
  return (
    <main className='flex flex-col flex-1 mx-3 p-1 gap-4 min-w-[800px]'>
      <Suspense fallback={<TableSkeleton />}>
        <Reports />
      </Suspense>
    </main>
  );
}
