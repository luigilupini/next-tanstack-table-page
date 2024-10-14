import { NextResponse } from 'next/server';

import { auth } from './auth';

export const config = {
  matcher: ['/'],
};

export default auth((req) => {
  // console.log(req.auth);
  if (!req.auth) {
    return NextResponse.redirect(new URL('/api/auth/signin', req.url));
  }
});
