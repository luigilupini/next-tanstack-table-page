import Link from 'next/link';

import ThemeToggle from '@/components/theme-toggle';
import UserButton from '@/components/user-button';

export default function Header() {
  return (
    <header className='font-bold p-2 mb-3 flex justify-between items-center px-4 gap-3'>
      <div className='flex gap-3'>
        <Link href='/' className='text-2xl'>
          Reports
        </Link>
      </div>
      <div className='flex gap-3'>
        <ThemeToggle />
        <UserButton />
      </div>
    </header>
  );
}
