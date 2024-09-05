import getAllPosts from "@/lib/queries/getAllPosts";
import getPageBySlug from "@/lib/queries/getPageBySlug";
import { Post } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Date from "@/components/date";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import InstaFeed from "@/components/instafeed";
import { Heart, HandHeart, HeartHandshake, MailOpen } from "lucide-react";

/**
 * The homepage route.
 *
 * @see https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#pages
 */
export default async function About() {
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

      <article>
        <div className="max-w-2xl mx-auto my-3 container px-4 md:px-6 py-12">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-center tracking-tight leading-normal font-normal p-2 text-neutral-700">
            we’re <span className="italic">hatch gals</span>
          </h1>
          <p className="text-center text-lg py-3 text-pretty text-neutral-700">
            Hatch Creatives provides space and opportunities for gals to come
            together as friends, coworkers and community members.
          </p>
          {/* <h1 dangerouslySetInnerHTML={{ __html: homepage.title }} />
          <div dangerouslySetInnerHTML={{ __html: homepage.content }} /> */}
        </div>
      </article>

      {/* Horizontally scrollable cards */}
      <section className="py-12 bg-muted">
        <div className="max-w-4xl mx-auto container px-4 md:px-6">
          <div className="flex space-x-4">
            <Card className="w-[300px] h-[300px] text-wrap text-sm bg-brown-200">
              <CardHeader>
                <div className="flex flex-col items-center space-y-4 pb-4">
                  <Heart size={64} strokeWidth={1} color="white" />
                </div>
                <CardTitle className="text-lg tracking-normal text-center text-brown-900">
                  encouragement
                </CardTitle>
                <CardDescription className="text-wrap text-center text-brown-800"></CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-center text-brown-800">
                <p>
                  We learn new skills, ask for and offer support, and stoke the
                  passions inside us. We celebrate and cheer on the steps and
                  successes of others.
                </p>
              </CardContent>
            </Card>
            <Card className="w-[300px] h-[300px] text-wrap text-sm bg-blue-200">
              <CardHeader>
                <div className="flex flex-col items-center space-y-4 pb-4">
                  <HandHeart size={64} strokeWidth={1} color="white" />
                </div>
                <CardTitle className="text-lg tracking-normal text-center text-blue-900">
                  collaboration
                </CardTitle>
                <CardDescription className="text-wrap text-center text-blue-800"></CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-center text-blue-800">
                <p>
                  We engage with other women and discover opportunities to
                  collaborate in new and innovative ventures.
                </p>
              </CardContent>
            </Card>

            <Card className="w-[300px] h-[300px] text-wrap text-sm bg-yellow-200">
              <CardHeader>
                <div className="flex flex-col items-center space-y-4 pb-4">
                  <HeartHandshake size={64} strokeWidth={1} color="white" />
                </div>
                <CardTitle className="text-lg tracking-normal text-center text-yellow-900">
                  accountability
                </CardTitle>
                <CardDescription className="text-wrap text-center text-yellow-800"></CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-center text-yellow-800">
                <p>
                  We seek accountability in order to bring our dreams and
                  ambitions to their full potential. We come alongside each
                  other as friends, mentors, and project partners.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto my-14 container px-4 md:px-6">
        <Card className="w-full text-wrap text-sm bg-brown-300 flex flex-col md:flex-row">
          <AspectRatio ratio={16 / 9}>
            <Image
              src="/hero.jpg"
              alt="Hero background"
              layout="fill"
              sizes="100vw"
              objectFit="cover"
            />
          </AspectRatio>
          <div className="flex flex-col justify-center">
            <CardHeader>
              <CardTitle className="tracking-tight text-3xl font-light text-center text-brown-900">
                let’s get together <br />{" "}
                <span className="italic">yeah, yeah, yeah</span>
              </CardTitle>
              <CardDescription className="text-wrap text-center text-brown-800">
                We learn new skills, ask for and offer support, and stoke the
                passions inside us.
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

      <aside className="bg-yellow-200 mt-8 py-8">
        <div className="max-w-4xl mx-auto container px-4">
          <div className="max-w-4xl mx-auto">
            <ScrollArea className="w-full whitespace-nowrap">
              <div className="flex w-max space-x-4 px-2 py-8">
                {posts.map((post: Post, i) => (
                  <Card key={i} className="w-full text-wrap text-sm">
                    <AspectRatio ratio={16 / 9}>
                      <Image
                        alt={post.featuredImage.node.altText}
                        layout="fill"
                        sizes="400px"
                        objectFit="cover"
                        src={post.featuredImage.node.sourceUrl}
                        priority={true}
                      />
                    </AspectRatio>
                    <CardHeader className="text-base hover:underline p-3">
                      <Link href={`/blog/${post.slug}`}>
                        <h2
                          className="text-lg font-semibold tracking-tight mb-4 text-pretty"
                          dangerouslySetInnerHTML={{ __html: post.title }}
                        />
                      </Link>
                    </CardHeader>
                    <CardContent className="text-sm p-3 text-gray-500">
                      <div dangerouslySetInnerHTML={{ __html: post.excerpt }} />
                    </CardContent>
                  </Card>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        </div>
      </aside>

      {/* Email signup form */}
      <section className="w-full py-12">
        <div className="max-w-4xl mx-auto container py-8 px-4 md:px-6 bg-brown-300">
          <div className="flex flex-col items-center space-y-4 pb-4">
            <MailOpen size={64} strokeWidth={1} color="white" />
          </div>
          <div className="flex flex-col items-center space-y-4 text-center">
            <h2 className="text-3xl font-light tracking-tight text-brown-900">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-brown-800">no spam ever. we promise.</p>
            <div className="flex w-full max-w-sm items-center">
              <Input
                className="border-none"
                type="email"
                placeholder="Enter your email"
              />
              <Button
                className="font-normal tracking-widest bg-brown-900"
                type="submit"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram feed */}
      <InstaFeed />
      <section className="">
        {/* <h2 className="text-2xl font-bold tracking-tighter mb-4">
            Follow us on Instagram
          </h2> */}
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex w-max">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
              <div key={i} className="w-[180px] h-[180px] relative">
                <Image
                  src={`/hero.jpg`}
                  alt={`Instagram post ${i}`}
                  layout="fill"
                  objectFit="cover"
                  className=""
                />
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </section>
    </main>
  );
}
