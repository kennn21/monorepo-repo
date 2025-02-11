This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started (PNPM)

First, go to branch `main` then install the dependencies:

```bash
pnpm install
```

Second, copy and paste the creds according to its paths:

- .env > ./apps/frontend-repo/{HERE}
- .service-account.json > ./packages/creds/{HERE}

Third, make sure the file names are as follows:

- env > .env
- service-account.json > .service-account.json

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Getting Started (NPM)

First, go to branch `ver/npm` then install the dependencies:

```bash
npm install
```

Second, copy and paste the creds according to its paths:

- .env > ./apps/frontend-repo/{HERE}
- .service-account.json > ./packages/creds/{HERE}

Third, rename the files as follows:

- env > .env
- service-account.json > .service-account.json

Then, run the development server:

```bash
npm run start:dev #prevent recursive turbo error
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
