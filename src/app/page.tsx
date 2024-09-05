import getAllPosts from "@/lib/queries/getAllPosts";
import getPageBySlug from "@/lib/queries/getPageBySlug";
import { Post } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

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
    <main className="flex-1">
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
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl font-extralight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl mb-4">
            hey, hatch gal
          </h1>
        </div>
      </section>

      <section className="max-w-4xl mx-auto my-14 container px-4 md:px-6">
        <Card className="w-full text-wrap text-sm bg-brown-300 flex flex-col md:flex-row">
          <div className="flex flex-col justify-center md:w-1/2">
            <AspectRatio ratio={3 / 2}>
              <Image
                src="/hero.jpg"
                alt="Hero background"
                layout="fill"
                sizes="100vw"
                objectFit="cover"
              />
            </AspectRatio>
          </div>
          <div className="flex flex-col justify-center md:w-1/2">
            <CardHeader>
              <CardTitle className="tracking-tight text-3xl font-light text-center text-brown-900">
                let’s get together <br />{" "}
                <span className="italic">yeah, yeah, yeah</span>
              </CardTitle>
              <CardDescription className="text-wrap text-center text-brown-800">
                Hatch Creatives is a community of women connecting globally and
                gathering locally to support, celebrate and create lives we
                love. Hatch provides space for gals to come together as friends,
                colleagues and community members.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-center">
              <Button className="font-normal tracking-widest bg-brown-700">
                Upcoming Meetups
              </Button>
            </CardContent>
          </div>
        </Card>
      </section>

      <section className="max-w-4xl mx-auto my-14 container px-4 md:px-6 flex flex-col md:flex-row gap-4">
        <Card className="w-full text-wrap text-sm bg-blue-300 flex flex-col">
          <div className="flex flex-col justify-center md:w-full">
            <CardHeader>
              <CardTitle className="tracking-tight text-3xl font-light text-center text-blue-900 text-pretty">
                looking to take the <span className="italic">next step</span> in
                your career?
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-center">
              <Button className="font-normal tracking-widest bg-blue-700">
                Job Board
              </Button>
            </CardContent>
          </div>
          <div className="md:w-full">
            <AspectRatio ratio={4 / 3}>
              <Image
                src="/hero.jpg"
                alt="Hero background"
                layout="fill"
                sizes="100vw"
                objectFit="cover"
              />
            </AspectRatio>
          </div>
        </Card>
        <Card className="w-full text-wrap text-sm bg-blue-100 flex flex-col">
          <div className="flex flex-col justify-center md:w-full">
            <CardHeader>
              <CardTitle className="tracking-tight text-3xl font-light text-center text-blue-900 text-pretty">
                share your <span className="italic">skills</span> with the world
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-center">
              <Button className="font-normal tracking-widest bg-blue-700">
                Collaborator List
              </Button>
            </CardContent>
          </div>
          <div className="md:w-full">
            <AspectRatio ratio={4 / 3}>
              <Image
                src="/hero.jpg"
                alt="Hero background"
                layout="fill"
                sizes="100vw"
                objectFit="cover"
              />
            </AspectRatio>
          </div>
        </Card>
      </section>

      <aside className="mt-8 py-8">
        <div className="max-w-4xl mx-auto container px-4">
          <h2 className="text-center text-4xl text-brown-900 mb-2 tracking-tight">
            latest <span className="italic">and</span> greatest
          </h2>
          <p className="font-sans font-medium uppercase text-center tracking-wider relative z-10 top-1">
            <span className="bg-brown-300 text-brown-800 px-4 py-2">
              on the blog
            </span>
          </p>
          <div className="max-w-4xl mx-auto">
            <ScrollArea className="w-full whitespace-nowrap">
              <div className="flex w-max space-x-4 px-2">
                {posts.map((post: Post, i) => (
                  <Card key={i} className="w-full text-wrap text-sm">
                    <AspectRatio ratio={1 / 1}>
                      <Image
                        alt={post.featuredImage.node.altText}
                        layout="fill"
                        sizes="400px"
                        objectFit="cover"
                        src={post.featuredImage.node.sourceUrl}
                        priority={true}
                      />
                    </AspectRatio>
                    <CardHeader className="text-base hover:underline p-0">
                      <Link href={`/blog/${post.slug}`}>
                        <h2
                          className="pt-1 text-center text-lg font-medium tracking-normal mb-4 text-brown-700 leading-tight"
                          dangerouslySetInnerHTML={{ __html: post.title }}
                        />
                      </Link>
                    </CardHeader>
                    {/* <CardContent className="text-sm p-3 text-gray-500">
                      <div dangerouslySetInnerHTML={{ __html: post.excerpt }} />
                    </CardContent> */}
                  </Card>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        </div>
      </aside>

      <section className="max-w-4xl mx-auto my-14 container px-4 md:px-6">
        <Card className="w-full text-wrap text-sm bg-brown-300 flex flex-col md:flex-row">
          <div className="flex flex-col justify-center md:w-1/3">
            <CardHeader>
              <CardTitle className="tracking-tight text-3xl font-light text-center text-brown-900">
                planning a <br /> <span className="italic">gals night</span> ?
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-center">
              <Button className="font-normal tracking-widest bg-brown-700">
                Hatch Hosting Guides
              </Button>
            </CardContent>
          </div>
          <div className="flex flex-col justify-center md:w-2/3">
            <AspectRatio ratio={4 / 3}>
              <Image
                src="/hero.jpg"
                alt="Hero background"
                layout="fill"
                sizes="100vw"
                objectFit="cover"
              />
            </AspectRatio>
          </div>
        </Card>
      </section>

      <section className="max-w-4xl mx-auto my-14 container px-4 md:px-6">
        <h2 className="text-center text-4xl text-blue-900 mb-2 tracking-tight">
          hatch hangouts
        </h2>
        <Card className="w-full text-wrap text-sm bg-blue-300 flex flex-col">
          <div className="flex flex-col justify-center md:w-full">
            <AspectRatio ratio={16 / 6}>
              <Image
                src="/hero.jpg"
                alt="Hero background"
                layout="fill"
                sizes="100vw"
                objectFit="cover"
              />
            </AspectRatio>
          </div>
          <div className="flex flex-col justify-center md:w-full pt-6">
            {/* <CardHeader>
              <CardTitle className="tracking-tight text-3xl font-light text-center text-blue-900">
                planning a <br /> <span className="italic">gals night</span> ?
              </CardTitle>
            </CardHeader> */}
            <CardContent className="text-sm text-center">
              <Button className="font-normal tracking-widest bg-blue-700 mx-2">
                Find a Hangout
              </Button>
              <Button className="font-normal tracking-widest bg-blue-700 mx-2">
                Host a Hangout
              </Button>
            </CardContent>
          </div>
        </Card>
      </section>
    </main>
  );
}
