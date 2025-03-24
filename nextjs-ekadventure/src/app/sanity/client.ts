import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "0evq1ccg",
  dataset: "production",
  apiVersion: '2024-03-20',
  useCdn: true,
  perspective: 'published',
  // stega: {
  //   enabled: true,
  //   studioUrl: '/studio',
  // },
});