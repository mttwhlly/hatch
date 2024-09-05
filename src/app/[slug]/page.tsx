import getAllPosts from "@/lib/queries/getAllPosts";
import getPageBySlug from "@/lib/queries/getPageBySlug";
import { Page, Post } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AspectRatio } from "@/components/ui/aspect-ratio";

/**
 * Fetches data from WordPress.
 */
async function fetchData(slug: string) {
  // If the slug is 'blog', fetch all posts.
  if (slug === "blog") {
    return { posts: await getAllPosts(), context: "blog" };
  }

  // Otherwise, this could be a page.
  const page = await getPageBySlug(slug);

  // If page data exists, return it.
  if (page) {
    return { post: page };
  }

  // Otherwise, return an error.
  return { error: "No data found" };
}

/**
 * Render a single page.
 */
function RenderPage({ page }: { page: Page }) {
  return (
    <main className="flex flex-col gap-8">
      <article>
        <h1 dangerouslySetInnerHTML={{ __html: page.title }} />
        <div dangerouslySetInnerHTML={{ __html: page.content }} />
      </article>
    </main>
  );
}

/**
 * Render posts list.
 */
function RenderPostsList({
  posts,
  context,
}: {
  posts: Post[];
  context: string;
}) {
  return (
    <main className="flex flex-col">
      {/* Hero section */}
      <section className="h-[200px] md:h-[300px] lg:h-[540px] relative flex items-center justify-center">
        <Image
          src="/hero.jpg"
          alt="Hero background"
          layout="fill"
          objectFit="cover"
          quality={100}
          sizes="100vw"
          priority
        />
        {/* <div className="relative z-10 text-center text-white">
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
        </div> */}
      </section>
      <h1 className="capitalize text-center text-4xl my-6">Latest {context}</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto px-8">
        {posts.map((post: Post) => (
          <article className="w-full pb-6 text-pretty" key={post.databaseId}>
            <div>
              <AspectRatio ratio={1 / 1}>
                <Image
                  alt={post.featuredImage.node.altText}
                  layout="fill"
                  objectFit="cover"
                  src={post.featuredImage.node.sourceUrl}
                  priority={true}
                />
              </AspectRatio>
            </div>
            <Link href={`/${context}/${post.slug}`}>
              <h2
                dangerouslySetInnerHTML={{ __html: post.title }}
                className="tracking-normal leading-tight pt-2"
              />
            </Link>
            <p className="text-sm text-gray-500 italic">
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            {/* <p className="text-sm text-gray-500">
              {post.commentCount} Comments
            </p> */}
            {/* <div dangerouslySetInnerHTML={{ __html: post.excerpt }} /> */}
            {/* <Link className="button" href={`/${context}/${post.slug}`}>
              View Post
            </Link> */}
          </article>
        ))}
      </div>
    </main>
  );
}

/**
 * Catch-all Archive Page route.
 */
export default async function Archive({
  params,
}: {
  params: { slug: string };
}) {
  // Get the slug from the params.
  const { slug } = params;

  // Fetch data from WordPress.
  const data = await fetchData(slug);

  // If there's an error, return a 404 page.
  if (data.error) {
    notFound();
  }

  // If this is a single page, render the page.
  if (data.post) {
    return <RenderPage page={data.post} />;
  }

  // Otherwise, this must be an archive. Render the posts list.
  if (data.posts && data.posts.length > 0) {
    return <RenderPostsList posts={data.posts} context={data.context} />;
  }

  // Otherwise, return a 404 page.
  notFound();
}
