"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Arrow, ServiceMark } from "@/components/brand-art";
import { SmsRequest } from "@/components/sms-request";
import { bookingMessage } from "@/lib/booking-message";
import type { AdvisorOption } from "@/src/data/advisor";

const euros = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export function BeautyAdvisor({ options, sms }: { options: readonly AdvisorOption[]; sms?: string }) {
  const [selectedId, setSelectedId] = useState<string>();
  const resultHeading = useRef<HTMLHeadingElement>(null);
  const selected = options.find(({ id }) => id === selectedId);

  useEffect(() => {
    if (selectedId) resultHeading.current?.focus();
  }, [selectedId]);

  return (
    <div className="wrap advisor-layout">
      <section aria-labelledby="conseiller-choix">
        <h2 id="conseiller-choix" tabIndex={-1}>Quelle est votre envie ?</h2>
        <ul className="advisor-options">
          {options.map(({ id, category, label, detail }) => (
            <li key={id}>
              <button
                className="advisor-option"
                type="button"
                aria-pressed={selectedId === id}
                aria-controls="conseiller-resultats"
                onClick={() => setSelectedId(id)}
              >
                <span className="advisor-option-mark"><ServiceMark slug={category} /></span>
                <span>
                  <strong>{label}</strong>
                  <span className="advisor-option-detail">{detail}</span>
                </span>
                <Arrow />
              </button>
            </li>
          ))}
        </ul>
      </section>
      <section id="conseiller-resultats" className="advisor-results" aria-labelledby="conseiller-resultats-titre">
        <h2 id="conseiller-resultats-titre" ref={resultHeading} tabIndex={-1}>
          {selected ? "Les soins à découvrir" : "Vos suggestions"}
        </h2>
        {selected ? (
          <>
            <p className="advisor-selection">{selected.label}</p>
            <ul className="advisor-recommendations">
              {selected.recommendations.map(({ name, priceEuros, durationMinutes, note, href, isDetail }) => (
                <li key={name}>
                  <div className="advisor-recommendation-head">
                    <h3>{name}</h3>
                    <p className="advisor-price">
                      <strong>{euros.format(priceEuros)}</strong>
                      {durationMinutes !== undefined && <span>{durationMinutes} min</span>}
                    </p>
                  </div>
                  <p>{note}</p>
                  <Link className="quiet-link" href={href}>{isDetail ? "Voir la fiche du soin" : "Voir dans la carte"} <Arrow diagonal /></Link>
                  {sms && <SmsRequest phone={sms} message={bookingMessage(name)} />}
                </li>
              ))}
            </ul>
            <a className="quiet-link advisor-change" href="#conseiller-choix">Changer d’envie</a>
          </>
        ) : (
          <p className="advisor-prompt">Choisissez une envie pour afficher les prestations et leurs tarifs.</p>
        )}
        <Link className="quiet-link advisor-catalogue-link" href="/prestations">Voir la carte complète <Arrow diagonal /></Link>
      </section>
    </div>
  );
}
