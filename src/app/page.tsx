import getAllPosts from "@/lib/queries/getAllPosts";
import getPageBySlug from "@/lib/queries/getPageBySlug";
import { Post } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";

/**
 * The homepage route.
 *
 * @see https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#pages
 */
export default async function Home() {
  // Fetch homepage from WordPress.
  const homepage = await getPageBySlug("/");

  // Fetch posts from WordPress.
  const posts = await getAllPosts();

  console.log("homepage is: ", homepage);

  // No data? Bail...
  if (!posts || !posts.length || !homepage) {
    notFound();
  }

  return (
    <main className="max-w-3xl flex-1">
      {/* Hero section */}
      <section className="w-full h-[600px] relative flex items-center justify-center">
        <Image
          src="/hero-image.jpg"
          alt="Hero background"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
        />
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl mb-4">
            Welcome to Our Website
          </h1>
          <p className="mx-auto max-w-[700px] text-xl mb-8">
            Discover amazing features and services that will transform your
            experience.
          </p>
          <div className="space-x-4">
            <Button
              variant="outline"
              className="bg-white text-black hover:bg-gray-200"
            >
              Get Started
            </Button>
            <Button
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-black"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Horizontally scrollable cards */}
      <section className="w-full py-12 bg-muted">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl font-bold tracking-tighter mb-4">
            Featured Content
          </h2>
          <ScrollArea className="w-full whitespace-nowrap rounded-md border">
            <div className="flex w-max space-x-4 p-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="w-[250px] h-[250px]">
                  <CardHeader>
                    <CardTitle>Card {i}</CardTitle>
                    <CardDescription>This is a scrollable card</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Content for Card {i}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </section>
      <article>
        <h1 dangerouslySetInnerHTML={{ __html: homepage.title }} />
        <div dangerouslySetInnerHTML={{ __html: homepage.content }} />
      </article>

      <aside>
        <h2>Latest Posts</h2>
        <div className="flex flex-wrap gap-8">
          {posts.map((post: Post) => (
            <article className="w-72" key={post.databaseId}>
              <Image
                alt={post.featuredImage.node.altText}
                height={post.featuredImage.node.mediaDetails.height}
                src={post.featuredImage.node.sourceUrl}
                width={post.featuredImage.node.mediaDetails.width}
                priority={true}
              />
              <Link href={`/blog/${post.slug}`}>
                <h2 dangerouslySetInnerHTML={{ __html: post.title }} />
              </Link>
              <p className="text-sm text-gray-500">
                {post.commentCount} Comments
              </p>
              <div dangerouslySetInnerHTML={{ __html: post.excerpt }} />
              <Link className="button" href={`/blog/${post.slug}`}>
                View Post
              </Link>
            </article>
          ))}
        </div>
      </aside>
      {/* Instagram feed */}
      <section className="w-full py-12">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl font-bold tracking-tighter mb-4">
            Instagram Feed
          </h2>
          <ScrollArea className="w-full whitespace-nowrap rounded-md border">
            <div className="flex w-max space-x-4 p-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="w-[300px] h-[300px] relative">
                  <Image
                    src={`/instagram-${i}.jpg`}
                    alt={`Instagram post ${i}`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </section>

      {/* Email signup form */}
      <section className="w-full py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h2 className="text-2xl font-bold tracking-tighter">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-muted-foreground">
              Stay updated with our latest news and offers
            </p>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input type="email" placeholder="Enter your email" />
              <Button type="submit">Subscribe</Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
