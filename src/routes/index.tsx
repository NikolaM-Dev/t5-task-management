import { createFileRoute } from '@tanstack/react-router';

import { getData } from '#/data/get-neon-data';

export const Route = createFileRoute('/')({
  component: Home,

  loader: async () => {
    return getData();
  },
});

function Home() {
  const data = Route.useLoaderData();

  return <>{data}</>;
}
