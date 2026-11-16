import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { Arrow } from "@/components/brand-art";
import { MobileContact } from "@/components/contact";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: site.origin,
  title: { default: "L. Beauté", template: "%s | L. Beauté" },
  robots: { index: Boolean(site.origin), follow: Boolean(site.origin) },
};

const navigation = [
  { href: "/prestations", label: "Prestations" },
  { href: "/institut", label: "L’institut" },
  { href: "/cartes-cadeaux", label: "Cartes cadeaux" },
  { href: "/conseils", label: "Conseils" },
  { href: "/contact", label: "Contact" },
];

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>
        <a className="skip" href="#contenu">Aller au contenu</a>
        <header className="header">
          <div className="wrap header-inner">
            <Link href="/" className="brand-lockup" aria-label="L. Beauté, accueil"><span className="brand">L. Beauté<span>.</span></span><span className="brand-location">Institut de beauté · Nampty</span></Link>
            <nav aria-label="Navigation principale">
              <ul className="header-nav">
                {navigation.map(({ href, label }) => <li key={href}><Link href={href}>{label}</Link></li>)}
              </ul>
            </nav>
            <Link className="header-cta" href="/contact">Prendre rendez-vous <Arrow diagonal /></Link>
          </div>
        </header>
        <main id="contenu">{children}</main>
        <footer className="footer">
          <div className="wrap footer-inner">
            <div><Link href="/" className="brand">L. Beauté<span>.</span></Link><p>Institut de beauté · Nampty (80160), Somme</p></div>
            <Link href="/contact" className="quiet-link">Contact et rendez-vous <Arrow diagonal /></Link>
          </div>
        </footer>
        <MobileContact />
      </body>
    </html>
  );
}

