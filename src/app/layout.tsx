import config from "@/lib/config";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Libre_Baskerville, Outfit } from "next/font/google";

const baskerville = Libre_Baskerville({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-libre-baskerville",
});

const outfit = Outfit({
  weight: ["400", "700"],
  style: ["normal"],
  subsets: ["latin"],
  variable: "--font-outfit",
});

/**
 * Setup metadata.
 *
 * @see https://nextjs.org/docs/app/building-your-application/optimizing/metadata
 */
export const metadata: Metadata = {
  metadataBase: new URL(config.siteUrl),
  title: `${config.siteName} - ${config.siteDescription}`,
  description: config.siteDescription,
};

/**
 * Setup viewport.
 *
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-viewport
 */
export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#18181b",
};

/**
 * Root layout component.
 *
 * @see https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required
 */
export default function RootLayout({
  children,
  header,
  footer,
}: {
  children: React.ReactNode;
  header: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${baskerville.variable} ${outfit.variable}`}>
      <body className="font-serif">
        {header}
        {children}
        {footer}
      </body>
    </html>
  );
}

// export default async function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   // fetch data from graphql
//   let data;
//   if (process.env.WORDPRESS_API_URL) {
//     const response = await fetch(process.env.WORDPRESS_API_URL, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         query: `
//           query {
//             posts {
//               nodes {
//                 title
//                 excerpt
//               }
//             }
//           }
//         `,
//       }),
//     });
//     data = await response.json();
//   }

//   console.log(JSON.stringify(data, null, 2));
