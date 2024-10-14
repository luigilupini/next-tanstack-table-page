import type { Metadata } from 'next';
import '@/app/globals.css';

import { auth } from '@/auth';
import Header from '@/components/header';
import { jetBrainsMono, rubik } from '@/lib/typeface/fonts';
import ProviderTree from '@/state/provider-tree';

export const metadata: Metadata = {
  title: 'Demonstration Table',
  description: 'Demonstration Table',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (session?.user) {
    session.user = {
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
    };
  }
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${rubik.variable} ${jetBrainsMono.variable} antialiased flex flex-col h-screen w-screen bg-background text-foreground`}
      >
        <ProviderTree session={session}>
          <Header />
          {children}
        </ProviderTree>
      </body>
    </html>
  );
}
