import { LocationDetails } from "./location";
import { SmsRequest } from "./sms-request";
import { bookingMessage } from "@/lib/booking-message";
import { site } from "@/lib/site";

const methods = [
  { short: "Appeler", label: "Appeler l’institut", href: "tel:" + site.phone, icon: "phone" },
  { short: "SMS", label: "Envoyer un SMS", href: site.sms && "sms:" + site.sms, icon: "sms" },
  { short: "Facebook", label: "Contacter sur Facebook", href: site.facebook, icon: "facebook" },
] as const;
const availableMethods = methods.filter(({ href }) => href);

const iconPaths = {
  phone: "M6 3h3l2 5-2 2a12 12 0 0 0 5 5l2-2 5 2v3a3 3 0 0 1-3 3A16 16 0 0 1 3 6a3 3 0 0 1 3-3Z",
  sms: "M4 5h16v11H9l-5 4V5Zm4 4h8m-8 3h6",
  facebook: "M14 21v-8h3l.5-4H14V7c0-1 .4-2 2-2h2V2h-3c-3 0-5 2-5 5v2H7v4h3v8",
};

export function MobileContact() {
  return (
    <nav className="mobile-contact" aria-label="Rendez-vous">
      {availableMethods.map(({ short, label, href, icon }) => (
        <a key={short} href={href} aria-label={label}>
          <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"><path d={iconPaths[icon]} /></svg>
          {short}
        </a>
      ))}
    </nav>
  );
}

export function BookingActions({ service, facebook = true, gift = false }: { service?: string; facebook?: boolean; gift?: boolean }) {
  const displayedPhone = site.phone.replace(/^\+33([1-9])(\d{2})(\d{2})(\d{2})(\d{2})$/, "0$1 $2 $3 $4 $5");
  const message = gift
    ? "Bonjour L. Beauté, je souhaite me renseigner sur une carte cadeau. Quelles sont les options et les modalités de retrait ? Merci !"
    : service && bookingMessage(service);

  if (site.sms && message) {
    return (
      <div className="booking-actions">
        <a className="button" href={"tel:" + site.phone} aria-label={"Appeler le " + displayedPhone}>{displayedPhone}</a>
        <div className="booking-texting">
          <SmsRequest phone={site.sms} message={message} />
          {facebook && <a className="quiet-link" href={site.facebook}>Contacter sur Facebook</a>}
        </div>
      </div>
    );
  }

  return (
    <ul className="flex flex-wrap gap-3">
      {availableMethods.filter(({ icon }) => facebook || icon !== "facebook").map(({ label, href, icon }) => (
        <li key={label}>
          <a className="button" href={href} aria-label={icon === "phone" ? "Appeler le " + displayedPhone : undefined}>
            {icon === "phone" ? displayedPhone : label}
          </a>
        </li>
      ))}
    </ul>
  );
}

export function ContactDetails({ showAddress = true }: { showAddress?: boolean }) {
  return (
    <div className="flow">
      {showAddress && <LocationDetails />}
      <BookingActions />
    </div>
  );
}
