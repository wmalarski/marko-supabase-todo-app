# Marko Run Supabase Todo App

## TODO List

- [x] styles setup: `tailwind`, `daisyui`, `class-variance-authority`
- [x] reusable components using attribute tags
- [x] tags api preview
- [x] supabase email/password sign up and sign in
- [x] supabase magic code sign in
- [x] supabase oauth sign in
- [x] supabase pkce auth flow
- [x] todo list with: update/delete/create/list
- [x] server side supabase data fetching with row security enabled
- [x] request validation using `decode-formdata` and `valibot`
- [x] manual progressive enhancement for all actions
- [x] works with javascript disabled
- [x] [typescript utility `buildPath`](src/utils/paths.ts) for building correct navigation paths

## Installation

```graphql
npm install
npm run dev
```

[Supabase database schema](src/db/setup.sql)

## Environmental variables

```graphql
VITE_PUBLIC_SUPABASE_URL=
VITE_PUBLIC_SUPABASE_ANON_KEY=
```

## Overview

This project is powered by [@marko/run](https://github.com/marko-js/run).

- Run `npm run dev` to start the development server
- Run `npm run build` to build a production-ready node.js server
- Run `npm run preview` to run the production server

## Adding Pages

Pages map to the directory structure. You can add additional pages by creating files/directories under `src/routes` with `+page.marko` files.  Learn more in the [`@marko/run` docs](https://github.com/marko-js/run/#file-based-routing).

