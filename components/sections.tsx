import Link from "next/link";
import { categories } from "@/lib/content";
import { absolute } from "@/lib/site";
import { JsonLd } from "./json-ld";

export function CategoryLinks({ current }: { current?: string }) {
  return (
    <ul className="category-list">
      {categories.filter(({ slug }) => slug !== current).map(({ slug, title, summary }) => (
        <li key={slug}>
          <Link href={"/" + slug}>
            <span><strong>{title}</strong><small>{summary}</small></span>
            <span aria-hidden="true">↗</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function Breadcrumb({ title, path, category, parent }: {
  title: string;
  path: string;
  category?: boolean;
  parent?: { name: string; path: string };
}) {
  const ancestors = [{ name: "Accueil", path: "/" }];
  if (category || parent) ancestors.push({ name: "Prestations", path: "/prestations" });
  if (parent) ancestors.push(parent);

  const items = [...ancestors, { name: title, path }];
  const schema = (category || parent || path === "/prestations") && absolute(path) ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absolute(item.path),
    })),
  } : undefined;

  return (
    <>
      <nav aria-label="Fil d’Ariane">
        <ol className="breadcrumb flex flex-wrap items-center gap-2">
          {ancestors.map((item, index) => (
            <li key={item.path}>
              {index > 0 && <span aria-hidden="true">/ </span>}
              <Link href={item.path}>{item.name}</Link>
            </li>
          ))}
          <li aria-current="page"><span aria-hidden="true">/ </span>{title}</li>
        </ol>
      </nav>
      {schema && <JsonLd data={schema} />}
    </>
  );
}

