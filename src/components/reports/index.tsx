import { delay } from '@/lib/utils';
import { getReports } from '@/server/reports';

import { columns } from './columns';
import { DataTable } from './data-table';

export default async function Reports() {
  await delay(2000);

  const apiKey = process.env.API_KEY || '';
  const data = await getReports(apiKey);

  return (
    <section className='flex-1 py-[5%]'>
      <DataTable columns={columns} data={data} />
    </section>
  );
}
