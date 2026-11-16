import Link from "next/link";
import { formatPrice } from "@/lib/format-price";
import { serviceDetailPath } from "@/src/data/service-details";
import { serviceGroups } from "@/src/data/services";

export function ServiceMenu({ category }: { category: string }) {
  const groups = serviceGroups.filter((group) => group.category === category);
  const hasMultipleGroups = groups.length > 1;
  const GroupHeading = hasMultipleGroups ? "h3" : "h2";

  return (
    <section className="interior-menu" aria-label="Prestations et tarifs">
      {hasMultipleGroups && (
        <>
          <h2 className="interior-menu-heading">Tarifs par zone</h2>
          <nav aria-label="Rubriques des tarifs">
            <ul className="interior-menu-nav">
              {groups.map(({ id, title }) => (
                <li key={id}><a href={"#tarifs-" + id}>{title}</a></li>
              ))}
            </ul>
          </nav>
        </>
      )}
      {groups.map(({ id, title, offer, services }) => (
        <section key={id} id={"tarifs-" + id} className="interior-menu-group" aria-labelledby={"rubrique-" + id}>
          <GroupHeading id={"rubrique-" + id}>{title ?? "Prestations et tarifs"}</GroupHeading>
          {offer && <p className="interior-offer">{offer}</p>}
          <ul className="interior-service-list">
            {services.map(({ name, description, priceEuros, durationMinutes }) => {
              const path = serviceDetailPath(id, name);
              return (
                <li key={name}>
                  <div>
                    <strong>
                      {path ? <Link className="underline underline-offset-4 decoration-amber-700 hover:decoration-current" href={path}>{name}</Link> : name}
                    </strong>
                    {description && <p>{description}</p>}
                  </div>
                  <div className="interior-service-price">
                    <span>{formatPrice(priceEuros)}</span>
                    {durationMinutes !== undefined && <small>{durationMinutes} min</small>}
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </section>
  );
}
