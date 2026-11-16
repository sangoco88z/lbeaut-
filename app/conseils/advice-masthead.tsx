import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { absolute } from "@/lib/site";

export function AdviceMasthead({ title, introduction, path }: {
  title: string;
  introduction: string;
  path: string;
}) {
  const isArticle = path !== "/conseils";
  const ancestors = [{ name: "Accueil", path: "/" }];
  if (isArticle) ancestors.push({ name: "Conseils beauté", path: "/conseils" });
  const breadcrumbs = [...ancestors, { name: title, path }];

  return (
    <header className="advice-masthead">
      <div className="wrap">
        <div className="advice-reading">
          <nav aria-label="Fil d’Ariane">
            <ol className="breadcrumb flex flex-wrap gap-x-2 gap-y-1">
              {ancestors.map((item, index) => (
                <li key={item.path}>
                  {index > 0 && <span aria-hidden="true">/ </span>}
                  <Link href={item.path}>{item.name}</Link>
                </li>
              ))}
              <li aria-current="page"><span aria-hidden="true">/ </span>{title}</li>
            </ol>
          </nav>
          <h1>{title}</h1>
          <p>{introduction}</p>
        </div>
      </div>
      {absolute(path) && (
        <JsonLd data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: breadcrumbs.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: absolute(item.path),
          })),
        }} />
      )}
    </header>
  );
}
