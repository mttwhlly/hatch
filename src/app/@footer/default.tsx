import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import InstaFeed from "@/components/instafeed";
import { MailOpen } from "lucide-react";

export default function Footer() {
  return (
    <>
      {/* Email signup form */}
      <section className="max-w-4xl mx-auto my-14 container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 p-8 bg-brown-100">
          <MailOpen size={64} strokeWidth={1} color="white" />

          <h2 className="text-3xl font-light tracking-tight text-brown-900">
            stay in the know
          </h2>
          <p className="text-brown-800">
            Receive our newsletter and get exclusive content delivered right to
            your inbox.
          </p>
          <div className="flex w-full max-w-sm items-center">
            <Input
              className="border-none"
              type="email"
              placeholder="Email Address"
            />
            <Button
              className="font-normal tracking-widest bg-brown-900"
              type="submit"
            >
              Add me to the list
            </Button>
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
      <footer className="w-full pt-8 bg-brown-700 text-white flex flex-col">
        <div className="max-w-4xl container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-8 lg:px-0">
          <div className="flex flex-col items-center md:px-0">
            <div className="flex justify-center mb-4">
              <Link href="/">
                <svg
                  width="46"
                  height="48"
                  viewBox="0 0 46 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M31.944 28.912C30.504 32.816 29.192 34.512 26.568 34.512C24.136 34.512 22.824 33.232 22.824 31.28C22.824 30.512 23.048 29.616 23.4 28.656L25.64 22.672C25.992 21.712 26.216 20.976 26.216 20.368C26.216 19.696 25.832 19.28 25.064 19.28C23.336 19.28 21.224 22.256 19.528 28.048L17.768 34C17.512 34 16.712 33.968 15.432 33.968C14.152 33.968 13.352 34 13.064 34L18.952 13.776C19.624 11.536 19.432 11.184 17.992 11.024L16.616 10.864V10.48L24.872 9.136L25.224 9.36C24.712 10.544 24.232 11.888 23.752 13.424L22.792 16.752C21.64 20.656 20.712 22.544 19.08 27.952C20.904 22 22.888 17.776 26.984 17.776C29.256 17.776 30.504 19.152 30.504 21.104C30.504 21.968 30.312 22.832 29.96 23.76L27.592 30.16C27.336 30.864 27.08 31.568 27.08 32.208C27.08 32.88 27.4 33.296 28.072 33.296C29.032 33.296 30.12 32.24 31.4 28.752L31.944 28.912Z"
                    fill="white"
                  />
                  <circle cx="23" cy="23" r="22.5" stroke="#E8C6BA" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
        <nav className="max-w-4xl container flex text-xs flex-row px-8 lg:px-0 pb-8 font-sans uppercase tracking-widest text-brown-200">
          <div className="flex flex-col md:flex-row w-full md:w-1/2">
            <div className="flex flex-col mx-0 my-4 gap-2 w-full md:w-1/2">
              <Link className="h-6 hover:underline" href="/about">
                About
              </Link>
              <Link className="h-6 hover:underline" href="/community">
                Community
              </Link>
              <Link className="h-6 hover:underline" href="/job-board">
                Job Board
              </Link>
              <Link className="h-6 hover:underline" href="/blog">
                Blog
              </Link>
            </div>
            <div className="flex flex-col mx-0 my-4 gap-2 w-full md:w-1/2">
              <Link className="h-6 hover:underline" href="/contact">
                Contact
              </Link>
              <Link className="h-6 hover:underline" href="/privacy">
                Privacy & Policy
              </Link>
              <Link className="h-6 hover:underline" href="/terms">
                Terms & Conditions
              </Link>
            </div>
          </div>
          <div className="flex flex-col md:flex-row w-full md:w-1/2">
            <div className="flex flex-col mx-0 my-4 gap-2 w-full md:w-1/2">
              <Link className="h-6 hover:underline" href="/host">
                Host a Meetup
              </Link>
            </div>
            <div className="flex flex-col mx-0 my-4 gap-2 w-full md:w-1/2">
              <Link className="h-6 hover:underline" href="/else">
                Something Else
              </Link>
              <Link className="h-6 hover:underline" href="/else">
                Something Else
              </Link>
              <Link className="h-6 hover:underline" href="/else">
                Something Else
              </Link>
            </div>
          </div>
        </nav>
        <div className="w-full container p-0">
          <p className="text-center text-[10px] uppercase font-sans leading-loose tracking-wider bg-brown-900 text-brown-400">
            Copyright &copy; 2018-{new Date().getFullYear()} Hatch Creatives.
            All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
