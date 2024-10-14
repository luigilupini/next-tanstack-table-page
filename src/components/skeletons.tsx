import { Card } from '@/components/ui/card';

export function TableSkeleton({ rows = 10 }) {
  const items = [...Array(rows)].map((_, i) => ({ id: i }));
  return (
    <section className='py-[5%]'>
      <Card className='size-full overflow-hidden rounded-md'>
        <main className='relative flex size-full animate-pulse flex-col items-center gap-2 bg-muted-foreground/30 p-2'>
          <header className='flex w-full flex-col gap-2'>
            <div className='flex gap-2'>
              <div className='h-4 w-[134px] rounded-full bg-muted'></div>
              <div className='h-4 w-[134px] rounded-full bg-muted'></div>
              <div className='h-4 w-[134px] rounded-full bg-muted'></div>
            </div>
            <div className='h-9 w-full rounded-lg bg-muted'></div>
          </header>

          <section className='size-full rounded-md'>
            {items.map(({ id }) => (
              <div key={id} className='m-1 grid grid-cols-8 gap-0 drop-shadow'>
                <div className='col-span-1 flex h-[30px] place-items-center rounded-l-md bg-muted-foreground/20'>
                  <div className='ml-2 mr-auto size-4 rounded-md bg-muted' />
                </div>
                <div className='col-span-1 flex h-[30px] place-items-center bg-muted-foreground/20'>
                  <div className='mx-auto h-3 w-1/2 rounded-full bg-muted' />
                </div>
                <div className='col-span-1 flex h-[30px] place-items-center bg-muted-foreground/20'>
                  <div className='mx-auto h-3 w-1/2 rounded-full bg-muted' />
                </div>
                <div className='col-span-1 flex h-[30px] place-items-center bg-muted-foreground/20'>
                  <div className='mx-auto h-3 w-1/2 rounded-full bg-muted' />
                </div>
                <div className='col-span-1 flex h-[30px] place-items-center bg-muted-foreground/20'>
                  <div className='mx-auto h-3 w-1/2 rounded-full bg-muted' />
                </div>
                <div className='col-span-1 flex h-[30px] place-items-center bg-muted-foreground/20'>
                  <div className='mx-auto h-3 w-1/2 rounded-full bg-muted' />
                </div>
                <div className='col-span-1 flex h-[30px] place-items-center bg-muted-foreground/20'>
                  <div className='mx-auto h-3 w-1/2 rounded-full bg-muted' />
                </div>
                <div className='col-span-1 flex h-[30px] place-items-center rounded-r-md bg-muted-foreground/20'>
                  <div className='mx-auto h-3 w-1/2 rounded-full bg-muted' />
                </div>
              </div>
            ))}
          </section>

          <div className='h-9 w-full rounded-lg bg-muted'></div>
        </main>
      </Card>
    </section>
  );
}
