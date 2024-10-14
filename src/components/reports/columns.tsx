'use client';

import { cn } from '@/lib/utils';
import { ReportWithRelations } from '@/server/reports';
import { Severity } from '@prisma/client';
import { ColumnDef, FilterFn, Row } from '@tanstack/react-table';

/**
 * A multi-select filter function that checks if a column's value exists within the filter array.
 *
 * @param row - The current row being evaluated, which contains the data for this row in the table.
 * @param columnId - The ID of the column to retrieve the value from in the current row.
 * @param filterValue - An array of strings representing the selected filter values to compare against the column value.
 * @returns `true` if the filter is empty or if the column's value is included in the filter array, `false` otherwise.
 */
const multiSelectFilter: FilterFn<ReportWithRelations> = (
  row: Row<ReportWithRelations>,
  columnId: string,
  filterValue: string[]
) => {
  return (
    filterValue.length === 0 || filterValue.includes(row.getValue(columnId))
  );
};

/**
 * A custom filter function that checks if a column's value includes the filter value.
 * If the filter value is empty, all rows are returned.
 * We convert the row value to a string for partial matching.
 * Lastly, we row value includes the filter value (partial match).
 *
 * @param row - The current row being evaluated, which contains the data for this row in the table.
 * @param columnId - The ID of the column to retrieve the value from in the current row.
 * @param filterValue - The filter value to compare against the column value.
 * @returns `true` if the filter is empty or if the column's value includes the filter value, `false` otherwise.
 */
const customIdFilter: FilterFn<ReportWithRelations> = (
  row: Row<ReportWithRelations>,
  columnId: string,
  filterValue: string
) => {
  if (!filterValue || filterValue === '') {
    return true; // If no filter value, return all rows
  }
  const rowValue = String(row.getValue(columnId));
  return rowValue.includes(filterValue);
};

/**
 * Formats an enum value by adding a space between camel case words.
 *
 * @param enumValue - The enum value to format.
 * @returns The formatted enum value with spaces between camel case words.
 */
const formatEnumValue = (enumValue: string) => {
  return enumValue.replace(/([a-z])([A-Z])/g, '$1 $2');
};

export const projectOptions = [
  { label: 'Wallet Wonders', value: 'Wallet Wonders', icon: 'Sara' },
  { label: 'Encrypted Exchange', value: 'Encrypted Exchange', icon: 'Eliza' },
  { label: 'Hash Hacienda', value: 'Hash Hacienda', icon: 'Sarah' },
  { label: 'Public Key Party', value: 'Public Key Party', icon: 'Easton' },
  { label: 'Satoshi Boulevard', value: 'Satoshi Boulevard', icon: 'Christian' },
  { label: 'Key Keepers', value: 'Key Keepers', icon: 'Andrea' },
  { label: 'Big-Endians', value: 'Big-Endians', icon: 'Mackenzie' },
  { label: 'Small-Endians', value: 'Small-Endians', icon: 'Jade' },
];

export const columns: ColumnDef<ReportWithRelations>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    filterFn: customIdFilter, // Use custom filter function
    cell: ({ row }) => {
      return (
        <span className='mr-1 border border-border rounded-md p-1 text-[10px] font-semibold'>
          #{row.getValue('id')}
        </span>
      );
    },
  },
  {
    accessorKey: 'project',
    header: 'Project',
    accessorFn: (row) => row.project.name,
    filterFn: multiSelectFilter,
    cell: ({ row }) => {
      const projectName = row.original.project.name;
      const seed = projectOptions.find(
        (option) => option.label === projectName
      )?.icon;
      const identiconUrl = `https://api.dicebear.com/9.x/identicon/svg?seed=${seed}`;
      return (
        <div className='flex items-center justify-start'>
          <img
            src={identiconUrl}
            alt={projectName}
            className='size-[10px] mr-[6px] saturate-0'
          />
          <span>{projectName}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'hacker.email',
    header: 'Email',
  },
  {
    accessorKey: 'type',
    header: 'Type',
    filterFn: multiSelectFilter,
    cell: ({ row }) => {
      const type = row.getValue('type') as string;
      return <span>{formatEnumValue(type)}</span>;
    },
  },
  {
    accessorKey: 'severity',
    header: 'Severity',
    filterFn: multiSelectFilter,
    cell: ({ row }) => {
      const severity = row.getValue('severity') as Severity;
      const severityClass = {
        Critical: 'text-warning bg-warning/20 border-warning',
        High: 'text-destructive bg-destructive/20 border-destructive',
        // prettier-ignore
        Medium: 'text-secondary bg-secondary/20 border-secondary dark:text-primary dark:bg-primary/20 dark:border-primary',
        Low: 'text-success bg-success/20 border-success',
        None: 'text-foreground bg-foreground/10 border-foreground',
      }[severity];
      return (
        <span
          className={cn(
            'font-semibold rounded-md px-2 py-[1px] text-[11px] center w-fit',
            severityClass
          )}
        >
          {severity}
        </span>
      );
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'submissionDate',
    header: 'Submission',
    cell: ({ row }) => {
      const date = new Date(row.getValue('submissionDate'));
      return <span className='tabular-nums'>{date.toLocaleDateString()}</span>;
    },
  },
];
