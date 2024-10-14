'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { ReportType, Severity, Status } from '@prisma/client';
import { Cross2Icon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';

import { projectOptions } from './columns';
import { DataTableFacetedFilter } from './data-table-facet-filter';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

const mapEnumToOptions = (enumObj: object) =>
  Object.entries(enumObj).map(([key, value]) => ({
    label: value.replace(/([a-z])([A-Z])/g, '$1 $2'),
    value: key,
  }));

const severityOptions = mapEnumToOptions(Severity);
const typeOptions = mapEnumToOptions(ReportType);
const statusOptions = Object.values(Status);

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const currentStatusFilter = table
    .getColumn('status')
    ?.getFilterValue() as string;

  return (
    <header className='flex flex-col gap-3'>
      <div className='flex flex-1 items-center border rounded-md shadow-sm w-fit overflow-hidden'>
        <ButtonFilterField
          label='All'
          onClick={() => table.getColumn('status')?.setFilterValue(undefined)}
          isActive={currentStatusFilter === undefined}
          className='border-none'
        />
        {statusOptions.map((status) => (
          <ButtonFilterField
            key={status}
            label={status}
            onClick={() => table.getColumn('status')?.setFilterValue(status)}
            isActive={currentStatusFilter === status}
          />
        ))}
      </div>

      <div className='flex flex-1 items-center space-x-2'>
        <InputField
          placeholder='Search by ID'
          columnId='id'
          table={table}
          type='number'
        />
        <InputField
          placeholder='Search by email'
          columnId='hacker_email'
          table={table}
        />

        {table.getColumn('severity') && (
          <DataTableFacetedFilter
            column={table.getColumn('severity')}
            title='Severity'
            options={severityOptions}
          />
        )}
        {table.getColumn('type') && (
          <DataTableFacetedFilter
            column={table.getColumn('type')}
            title='Report Type'
            options={typeOptions}
          />
        )}
        {table.getColumn('project') && (
          <DataTableFacetedFilter
            column={table.getColumn('project')}
            title='Project'
            options={projectOptions}
          />
        )}

        {isFiltered && (
          <Button
            variant='ghost'
            onClick={() => table.resetColumnFilters()}
            className='absolute right-0 top-0'
            size='sm'
          >
            Reset
            <Cross2Icon className='ml-2 h-4 w-4' />
          </Button>
        )}
      </div>
    </header>
  );
}

interface ButtonFilterFieldProps {
  label: string;
  isActive: boolean;
  className?: string;
  onClick: () => void;
}

function ButtonFilterField({
  label,
  isActive,
  className,
  onClick,
}: ButtonFilterFieldProps) {
  return (
    <button
      onClick={onClick}
      className={cn('h-7 px-2 border-l text-xs font-medium', className, {
        'bg-accent/80 text-accent-foreground': isActive,
        'hover:bg-accent/50 opacity-50': !isActive,
      })}
    >
      {label}
    </button>
  );
}

interface InputFieldProps<TData> {
  placeholder: string;
  className?: string;
  columnId: string;
  table: Table<TData>;
  type?: string;
}

function InputField<TData>({
  placeholder,
  className,
  columnId,
  table,
  type = 'text',
}: InputFieldProps<TData>) {
  const column = table.getColumn(columnId);
  return (
    <Input
      placeholder={placeholder}
      value={(column?.getFilterValue() as string) ?? ''}
      onChange={(event) => column?.setFilterValue(event.target.value)}
      className={cn('w-fit', className)}
      type={type}
    />
  );
}
