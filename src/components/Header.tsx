import getMenuBySlug from "@/lib/queries/getMenuBySlug";
import Link from "next/link";

/**
 * Header component.
 */
export default async function Header() {
  const menu = await getMenuBySlug("header");

  return (
    <header>
      <div>
        <h1 className="mb-0">Hatch Creatives</h1>
        <p>Here there every-dang-where</p>
      </div>
      <nav className="flex justify-between gap-4">
        {!!menu &&
          menu.menuItems.edges.map((item) => (
            <Link key={item.node.databaseId} href={item.node.uri}>
              {item.node.label}
            </Link>
          ))}
      </nav>
    </header>
  );
}
