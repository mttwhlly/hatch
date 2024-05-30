import getHeaderMenuById from "@/lib/queries/getHeaderMenuById";
import Link from "next/link";

/**
 * Header component.
 */
export default async function Header() {
  const menu = await getHeaderMenuById("dGVybToz");

  return (
    <header>
      <div>
        <h1 className="mb-0">Hatch Creatives</h1>
        <p>Here there every-dang-where</p>
      </div>
      <nav className="flex justify-between gap-4">
        {!!menu &&
          menu.menuItems.nodes.map((item) => (
            <Link key={item.databaseId} href={item.url}>
              {item.label}
            </Link>
          ))}
      </nav>
    </header>
  );
}
