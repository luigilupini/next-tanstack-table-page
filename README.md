# Next Tanstack Table App

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/luigilupini/next-tanstack-table-page.git
cd next-tanstack-table-page
```

### 2. Setup Prisma

This project uses Prisma as the ORM for database management. To get started with Prisma: Make sure your .env file contains the correct database URL under the DATABASE_URL key DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE_NAME.

This URL should point to your PostgreSQL database instance.

Example .env file:

```bash
DATABASE_URL="*********"
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=6VQYUJT4EUhKPjiga76dJdJd1GBQKjvoIg3ziF3ngHQ=
GOOGLE_CLIENT_ID="*********"
GOOGLE_CLIENT_SECRET="*********"
API_KEY=mypreciouskeyhere
```

### 3. Run Migrations & Seed Db

Once you have set up your .env file, run the following Prisma commands to generate the necessary migrations and synchronize your schema: `npx prisma migrate dev`

Under the prisma folder you will find a seeding file. Run: `node prisma/seed.ts` to seed the db.

### 4. Setup Google Provider for NextAuth.js

This project uses NextAuth.js for authentication with Google as a provider. You need to set up a Google provider in order to authenticate users.

1. Create a Google Cloud Project- Go to the Google Cloud Console and create a new project.
2. Enable OAuth 2.0 - In the APIs & Services section, go to Credentials and click Create Credentials > OAuth 2.0 Client IDs. Set the application type to Web application, and enter the following URIs: Authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`
3. Obtain Client ID and Client Secret - Once created, you will receive a Client ID and Client Secret.
4. Update the .env file - Add the Google client credentials to your .env file:

Example .env file:

```bash
DATABASE_URL="*********"
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=6VQYUJT4EUhKPjiga76dJdJd1GBQKjvoIg3ziF3ngHQ=
GOOGLE_CLIENT_ID="*********"
GOOGLE_CLIENT_SECRET="*********"
API_KEY=mypreciouskeyhere
```

For additional information see [`NextAuth.js Google Provider Documentation`](https://next-auth.js.org/providers/google).