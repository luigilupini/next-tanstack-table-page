'use client';

import { motion } from 'framer-motion';
import { Bird } from 'lucide-react';

import { cn } from '@/lib/utils';

export default function EmptyResult({ className }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      className={cn('center size-full flex-col gap-1 py-6', className)}
    >
      <Bird size={40} className='opacity-40' />
      <p className='center flex-col'>
        <span className='font-medium'>No results found</span>
        <span className='text-center text-sm opacity-60'>
          Please try a different filter configuration
        </span>
      </p>
    </motion.div>
  );
}
