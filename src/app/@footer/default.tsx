import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Image src="/logo.svg" alt="Logo" width={80} height={26} />
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            &copy; 2018-{new Date().getFullYear()} Hatch Creatives. All rights
            reserved.
          </p>
        </div>
        <nav className="flex items-center space-x-4 text-sm">
          <Link href="/terms">Terms</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
    </footer>
  );
}
