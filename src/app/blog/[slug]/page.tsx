import getAllPosts from "@/lib/queries/getAllPosts";
import getPostBySlug from "@/lib/queries/getPostBySlug";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

/**
 * Generate the static routes at build time.
 *
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-static-params
 */
export async function generateStaticParams() {
  // Get all blog posts.
  const posts = await getAllPosts();

  // No posts? Bail...
  if (!posts) {
    return [];
  }

  // Return the slugs for each post.
  return posts.map((post: { slug: string }) => ({
    slug: post.slug,
  }));
}

/**
 * Generate the metadata for each static route at build time.
 *
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata | null> {
  // Get the blog post.
  const post = await getPostBySlug(params.slug);

  // No post? Bail...
  if (!post) {
    return {};
  }

  return {
    title: post.seo.title,
    description: post.seo.metaDesc,
  };
}

/**
 * The blog post route.
 *
 * @see https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#pages
 */
async function Post({ params }: { params: { slug: string } }) {
  // Fetch a single post from WordPress.
  const post = await getPostBySlug(params.slug);

  // No post? Bail...
  if (!post) {
    notFound();
  }

  const date = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const excerpt = post.excerpt ? post.excerpt?.replace(/<[^>]*>?/gm, "") : "";

  return (
    <div className="block text-pretty antialiased">
      <div className="sm:mb-1 md:mb-1 lg:mb-16 xl:mb-17 2xl:mb-17 block">
        <div className="clear-both w-full">
          <figure>
            <Image
              src={post.featuredImage.node.sourceUrl}
              alt={post.featuredImage.node.altText}
              width={post.featuredImage.node.mediaDetails.width}
              height={post.featuredImage.node.mediaDetails.height}
              layout="responsive"
              className="w-full h-auto max-h-96 object-cover"
            />
            {/* <picture>
                      <source srcset="https://miro.medium.com/v2/resize:fit:640/format:webp/1*V7CDmi4_82KNKXlLVDTbaA.png 640w, https://miro.medium.com/v2/resize:fit:720/format:webp/1*V7CDmi4_82KNKXlLVDTbaA.png 720w, https://miro.medium.com/v2/resize:fit:750/format:webp/1*V7CDmi4_82KNKXlLVDTbaA.png 750w, https://miro.medium.com/v2/resize:fit:786/format:webp/1*V7CDmi4_82KNKXlLVDTbaA.png 786w, https://miro.medium.com/v2/resize:fit:828/format:webp/1*V7CDmi4_82KNKXlLVDTbaA.png 828w, https://miro.medium.com/v2/resize:fit:1100/format:webp/1*V7CDmi4_82KNKXlLVDTbaA.png 1100w, https://miro.medium.com/v2/resize:fit:4800/format:webp/1*V7CDmi4_82KNKXlLVDTbaA.png 4800w" sizes="(min-resolution: 4dppx) and (max-width: 700px) 50vw, (-webkit-min-device-pixel-ratio: 4) and (max-width: 700px) 50vw, (min-resolution: 3dppx) and (max-width: 700px) 67vw, (-webkit-min-device-pixel-ratio: 3) and (max-width: 700px) 65vw, (min-resolution: 2.5dppx) and (max-width: 700px) 80vw, (-webkit-min-device-pixel-ratio: 2.5) and (max-width: 700px) 80vw, (min-resolution: 2dppx) and (max-width: 700px) 100vw, (-webkit-min-device-pixel-ratio: 2) and (max-width: 700px) 100vw, 100vw" type="image/webp">
                      <source data-testid="og" srcset="https://miro.medium.com/v2/resize:fit:640/1*V7CDmi4_82KNKXlLVDTbaA.png 640w, https://miro.medium.com/v2/resize:fit:720/1*V7CDmi4_82KNKXlLVDTbaA.png 720w, https://miro.medium.com/v2/resize:fit:750/1*V7CDmi4_82KNKXlLVDTbaA.png 750w, https://miro.medium.com/v2/resize:fit:786/1*V7CDmi4_82KNKXlLVDTbaA.png 786w, https://miro.medium.com/v2/resize:fit:828/1*V7CDmi4_82KNKXlLVDTbaA.png 828w, https://miro.medium.com/v2/resize:fit:1100/1*V7CDmi4_82KNKXlLVDTbaA.png 1100w, https://miro.medium.com/v2/resize:fit:4800/1*V7CDmi4_82KNKXlLVDTbaA.png 4800w" sizes="(min-resolution: 4dppx) and (max-width: 700px) 50vw, (-webkit-min-device-pixel-ratio: 4) and (max-width: 700px) 50vw, (min-resolution: 3dppx) and (max-width: 700px) 67vw, (-webkit-min-device-pixel-ratio: 3) and (max-width: 700px) 65vw, (min-resolution: 2.5dppx) and (max-width: 700px) 80vw, (-webkit-min-device-pixel-ratio: 2.5) and (max-width: 700px) 80vw, (min-resolution: 2dppx) and (max-width: 700px) 100vw, (-webkit-min-device-pixel-ratio: 2) and (max-width: 700px) 100vw, 100vw"><img alt="" className="bg mq np c" width="2400" height="1496" loading="eager" role="presentation" src="https://miro.medium.com/v2/resize:fit:4824/1*V7CDmi4_82KNKXlLVDTbaA.png">
                    </picture> */}
            <figcaption className="mt-2 max-w-3xl mx-auto text-center font-sans font-normal text-sm tracking-normal text-neutral-500">
              {post.featuredImage.node.altText}
            </figcaption>
          </figure>
        </div>
        <article className="mt-8">
          <div className="block">
            <div className="block">
              <header>
                <div className="flex justify-center">
                  <div className="min-w-0 w-full my-0 mx-6 lg:max-w-2xl xl:max-w-2xl 2xl:max-w-2xl">
                    <h1
                      className="leading-8 tracking-tight not-italic font-serif font-bold text-3xl text-neutral-900 mt-4 md:text-5xl lg:mt-5 mb-4"
                      dangerouslySetInnerHTML={{ __html: post.title }}
                    />
                    <h2
                      className="tracking-tight font-serif italic font-normal text-neutral-500 sm:text-lg sm:mt-3 md:text-xl xl:text-2xl my-4"
                      dangerouslySetInnerHTML={{ __html: excerpt }}
                    />
                    {/* TODO: add featured image  */}

                    <div className="flex justify-between">
                      <div className="w-full block">
                        <div className="sm:items-start md:items-start lg:items-center xl:items-center 2xl:items-center flex">
                          <div>
                            <div className="flex items-baseline">
                              <a href="/" rel="noopener">
                                <div>
                                  <div
                                    className="inline-block"
                                    aria-hidden="false"
                                    aria-describedby="1"
                                    aria-labelledby="1"
                                  >
                                    <div className="block w-12 h-12 rounded-full border-2 border-white z-0">
                                      <div className="block relative">
                                        {/* TODO: fallback avatar (with hatch logo?) */}
                                        <img
                                          alt={post.author.node.name}
                                          className="block box-border rounded-full h-11 w-11 bg-grey"
                                          src="https://miro.medium.com/v2/resize:fill:88:88/1*K9Pu4PadoV2mMqHoH-AKyQ.png"
                                          width="44"
                                          height="44"
                                          loading="lazy"
                                        />
                                        <div className="shadow-none rounded-full block h-11 w-11 absolute top-0 border-1 hover:bg-transparent"></div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </a>
                            </div>
                          </div>
                          <div className="ml-3 w-full block">
                            <div className="flex">
                              <div style={{ flex: 1 }}>
                                <span className="font-sans font-normal text-sm">
                                  <div className="flex items-center">
                                    <div className="flex items-center flex-nowrap">
                                      <div className="flex items-center">
                                        <div>
                                          <div
                                            className="inline-block"
                                            aria-hidden="false"
                                            aria-describedby="1012"
                                            aria-labelledby="1012"
                                          >
                                            <p className="font-sans font-normal text-base tracking text-neutral-700">
                                              <a
                                                className="p-0 m-0 cursor-pointer disabled:cursor-not-allowed disabled:text-grey hover:underline"
                                                href="/"
                                                rel="noopener"
                                              >
                                                {post.author.node.name}
                                              </a>
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </span>
                              </div>
                            </div>
                            <div className="block flex-initial">
                              <span className="font-sans font-light text-sm">
                                <div className="flex items-start sm:flex-col md:flex-col flex-wrap">
                                  <span className="font-sans font-normal text-sm tracking-tight text-neutral-500">
                                    <div className="flex flex-initial">
                                      {/* TODO: get reading time from WP plugin or other method */}
                                      {/* <span>4 min read</span> */}
                                      {/* <div
                                        className="px-2 block"
                                        aria-hidden="true"
                                      >
                                        <span
                                          className="block"
                                          aria-hidden="true"
                                        >
                                          <span className="font-sans font-normal text-sm">
                                            ·
                                          </span>
                                        </span>
                                      </div> */}
                                      <span>{date}</span>
                                    </div>
                                  </span>
                                </div>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </header>

              <div className="flex justify-center">
                <div className="min-w-0 w-full my-0 mx-6 lg:max-w-2xl xl:max-w-2xl 2xl:max-w-2xl">
                  <div
                    className="leading-normal lg:leading-8 xl:leading-8 2xl:leading-8 tracking-tight not-italic font-serif font-normal text-lg text-neutral-600 mt-6 lg:text-xl xl:text-xl 2xl:text-xl lg:mt-8 xl:mt-8 2xl:mt-8 -mb-2 break-words whitespace-pre-line"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                </div>
              </div>
            </div>
          </div>

          <footer className="flex items-center justify-between gap-4 pb-4">
            <div>
              <h3>Categories</h3>
              <ul className="m-0 flex list-none gap-2 p-0">
                {post.categories.nodes.map((category) => (
                  <li className="m-0 p-0" key={category.databaseId}>
                    <Link href={`/blog/category/${category.name}`}>
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3>Tags</h3>
              <ul className="m-0 flex list-none gap-2 p-0">
                {post.tags.nodes.map((tag) => (
                  <li className="m-0 p-0" key={tag.databaseId}>
                    <Link href={`/blog/tag/${tag.name}`}>{tag.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </footer>
          <section className="border-t-2">
            <h3>Comments</h3>
            {post.comments.nodes.map((comment) => (
              <article key={comment.databaseId}>
                <header className="flex items-center gap-2">
                  <img
                    alt={comment.author.node.name}
                    className="m-0 rounded-full"
                    height={64}
                    loading="lazy"
                    src={comment.author.node.avatar.url}
                    width={64}
                  />
                  <div className="flex flex-col gap-2">
                    <h4
                      className="m-0 p-0 leading-none"
                      dangerouslySetInnerHTML={{
                        __html: comment.author.node.name,
                      }}
                    />
                    <time className="italic">{comment.date}</time>
                  </div>
                </header>

                <div dangerouslySetInnerHTML={{ __html: comment.content }} />
              </article>
            ))}
          </section>
        </article>
      </div>
    </div>
  );
}

export default Post;
